/**
 * @description: 登录相关接口
 */
import { request, type requestConfig } from './utils/request'
import type { AuthCodeReq, LoginReq, LoginUser } from '@/types/api'

// 验证码
export const getAuthCode = (config: requestConfig<AuthCodeReq>) => {
  return request<null>('/api/authcode/', 'post', config)
}
// 登录/注册
export const login = (config: requestConfig<LoginReq>) => {
  return request<LoginUser>('/api/login/', 'post', config)
}
// 登出
export const logout = (config?: requestConfig<null>) => {
  return request<null>('/api/logout/', 'post', config)
}
