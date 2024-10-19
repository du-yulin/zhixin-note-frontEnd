import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

import client from './axiosClient'

interface PathParams {
  [key: string]: string
}

export type requestConfig<D = any> = Omit<AxiosRequestConfig<D>, 'url' | 'method'>

export function requestWithPathParams<T = any, D = any>(
  url: string,
  method: Method = 'get',
  pathParams: PathParams,
  config?: requestConfig<D>
) {
  if (pathParams) {
    url = url.replace(/\{([^}]+)\}/g, (_, key) => pathParams[key] || '')
  }
  const axiosConfig = { ...config, url, method }
  return client.request<T, AxiosResponse<T>, D>(axiosConfig)
}

export function request<T = any, D = any>(
  url: string,
  method: Method = 'get',
  config?: requestConfig<D>
) {
  const axiosConfig = { ...config, url, method }
  return client.request<T, AxiosResponse<T>, D>(axiosConfig)
}
