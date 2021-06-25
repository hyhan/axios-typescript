import { AxiosRequestConfig } from './types/index'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },
}

const methodNoData = ['get', 'head', 'options', 'delete']
methodNoData.forEach((method) => {
  defaults.headers[method] = {}
})

const methodWithData = ['post', 'put', 'patch']
methodWithData.forEach((method) => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

export default defaults
