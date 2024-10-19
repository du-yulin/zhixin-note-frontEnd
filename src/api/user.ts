/**
 * @description 用户接口
 */
import { request, type requestConfig } from "./utils/request"
import type { UserProfile, UserProfileUpdate, UserProfileUpdateReq } from '@/types/api'

// 用户详情获取
export const getUserProfile = (config: requestConfig<null>) =>
  request<UserProfile>('/api/user/profile', 'get', config)

// 用户详情更新
export const updateUserProfile = (config: requestConfig<UserProfileUpdateReq>) =>
  request<UserProfileUpdate>('/api/user/profile', 'put', config)
