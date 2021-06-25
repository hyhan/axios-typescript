import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types/index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    if (timeout) {
      request.timeout = timeout
    }

    request.ontimeout = function handleTimeout() {
      console.error('timeout')
      reject(
        createError(
          `Timeout of ${config.timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          request
        )
      )
    }

    request.onreadystatechange = function headleLoad() {
      if (request.readyState !== 4 || request.status === 0) {
        return
      }

      const responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      }
      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
