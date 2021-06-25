import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
  RejectedFn,
  ResolvedFn,
} from './../types/index'
import dispatchRequest from './dispatchRequest'
import AxiosInterceptorManager from './Interceptor'

interface PromiseChain {
  resolved: ResolvedFn<any> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}
interface Interceptors {
  request: AxiosInterceptorManager<AxiosRequestConfig>
  response: AxiosInterceptorManager<AxiosResponse>
}

export default class Axios {
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new AxiosInterceptorManager<AxiosRequestConfig>(),
      response: new AxiosInterceptorManager<AxiosResponse>(),
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    const chain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined,
      },
    ]
    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(
    method: string,
    url: string,
    config?: AxiosRequestConfig
  ) {
    return this.request(
      Object.assign(config || {}, {
        url,
        method,
      })
    )
  }

  _requestMethodWithData(
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return this.request(
      Object.assign(config || {}, {
        url,
        data,
        method,
      })
    )
  }
}
