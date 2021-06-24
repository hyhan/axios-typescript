import { transformRequest, transformResponse } from './../helpers/data'
import { processHeaders } from './../helpers/headers'
import { buildURL } from './../helpers/url'
import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from './../types/index'
import xhr from './xhr'

export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  processConfig(config)
  return xhr(config).then(
    (res) => {
      return transformResponseData(res)
    },
    (e) => {
      return Promise.reject(e)
    }
  )
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
  config.headers = transformHeaders(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}