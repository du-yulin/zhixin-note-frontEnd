/**
 * @description: 公用类型库
 */

/**
 * 工具类型
 */
// 字符串键值对映射
type StrMap = Record<string, string>


/**
 * 业务数据类型
 */
// 基础数据类型定义
type Id = number|string
type UrlString = string
type DateTimeString = string
type History = StrMap

interface CommonUser {
  id: Id
  username: string
  nickname: string
  name: string
  email: string
  phone: string
  avatar: UrlString
  registration_date: string
  last_publish_datetime: string
  review_history: History
  publish_history: History
  following_number: number
  followers_number: number
  password: string
}

interface CommonFolder {
  id: Id
  name: string
  user: User
  parent: Folder
}


