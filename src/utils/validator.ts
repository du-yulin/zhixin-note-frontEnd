/**
 * @description: 验证器
 */

export const isPhone = (value: string) => {
  const regx = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return regx.test(value)
}

export const isEmail = (value: string) => {
  const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regx.test(value)
}