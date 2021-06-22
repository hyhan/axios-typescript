import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types/index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function headleLoad() {
      if (request.readyState !== 4) {
        return
      }

      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const responseHeaders = request.getAllResponseHeaders()
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        config,
        request,
        headers: responseHeaders,
      }

      resolve(response)
    }

    Object.keys(headers).forEach((key) => {
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        request.setRequestHeader(key, headers[key])
      }
    })

    request.send(data)
  })
}
