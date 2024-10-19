/**
 * @description api请求和返回类型定义
 */

// 认证类型定义
export type AuthCodeReq = { phone: string } | { email: string }

export type LoginReq =
  | { username: string; password: string }
  | { phone: string; password: string }
  | { email: string; password: string }
  | { phone: string; authcode: string }
  | { email: string; authcode: string }

export type LoginUser = Pick<CommonUser, 'id' | 'name' | 'avatar'>

// 用户类型定义
export type UserProfile = Pick<
  CommonUser,
  | 'id'
  | 'username'
  | 'nickname'
  | 'email'
  | 'phone'
  | 'avatar'
  | 'registration_date'
  | 'last_publish_datetime'
  | 'review_history'
  | 'publish_history'
  | 'following_number'
  | 'followers_number'
  >

export type UserProfileUpdateReq = Partial<
  Pick<CommonUser, 'nickname' | 'email' | 'phone' | 'avatar' | 'password'>
  >
export type UserProfileUpdate = Omit<UserProfileUpdate, 'password'>

// 笔记类型定义

