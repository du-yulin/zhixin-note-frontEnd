/**
 * @description: 登录页面的hook
 */

import { reactive, ref } from 'vue'
import { AxiosError } from 'axios'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

import router from '@/router'
import { login as APILogin, getAuthCode } from '@/api'
import { isEmail, isPhone } from '@/utils/validator'
import type { LoginReq, LoginUser, AuthCodeReq } from '@/types/api'
import { useUserStore } from '@/stores/user'
import { useUserSettingsStore } from '@/stores/userSettings'

const DEFAULTREDIRECT = 'home'
const login = async (data: LoginReq) => {
  if (!data) return
  let res
  try {
    res = await APILogin({ data })
    const loginUser = res.data
    return loginUser
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (Object.hasOwn(data, 'password')) {
          ElMessage.error('登录失败：用户名或密码错误')
        } else {
          ElMessage.error('登录失败：验证码错误')
        }
      } else {
        const errDetail = error.response?.data?.detail
        if (errDetail) {
          ElMessage.error(`登录失败：${errDetail}`)
        } else {
          ElMessage.error('登录失败：未知错误')
        }
      }
    } else {
      ElMessage.error('登录失败：未知错误')
    }
  }
}
const loginSuccessHandler = (loginUser: LoginUser, redirect: string) => {
  // 用户store 更新用户信息
  const userStore = useUserStore()
  userStore.user = loginUser
  ElMessage.success('登录成功')
  // usersettings store 更新用户设置
  const userSettingsStore = useUserSettingsStore()
  userSettingsStore.addUserSetting(loginUser.id)
  // 路由跳转
  setTimeout(() => {
    router.push({ name: redirect})
   },1000)
}
// 验证码登录hook
export function useAcLogin(props:{readonly redirect?:string}) {
  const ACLoginFormRef = ref<FormInstance>()
  const ACGetBtnProps = ref({
    text: '获取验证码',
    loading: false,
    disabled: true
  })
  const ACLoginForm = reactive({
    emailOrPhone: '',
    authcode: ''
  })
  const isEmailOrPhone = (rule: any, value: string, callback: any) => {
    if (!isEmail(value) && !isPhone(value)) {
      ACGetBtnProps.value.disabled = true
      callback(new Error('请输入正确格式的邮箱/手机号'))
    } else {
      ACGetBtnProps.value.disabled = false
      callback()
    }
  }
  const ACLoginRules = {
    emailOrPhone: [
      { required: true, message: '请输入手机号/邮箱', trigger: 'blur' },
      { validator: isEmailOrPhone, trigger: 'blur' }
    ],
    authcode: [
      { required: true, message: '请输入验证码', trigger: 'change' },
      { min: 4, message: '验证码长度不能小于4', trigger: 'blur' },
      { max: 6, message: '验证码长度不能大于6', trigger: 'blur' }
    ]
  }

  const ACLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    try {
      const isValid = await formEl.validate()
      if (!isValid) return
    } catch (error) {
      return
    }
    let data: LoginReq
    if (isEmail(ACLoginForm.emailOrPhone)) {
      data = { email: ACLoginForm.emailOrPhone, authcode: ACLoginForm.authcode }
    } else {
      data = { phone: ACLoginForm.emailOrPhone, authcode: ACLoginForm.authcode }
    }
    const loginUser = await login(data)
    if (loginUser) {
      loginSuccessHandler(loginUser, props.redirect || DEFAULTREDIRECT)
    }
  }
  const ACGetAuthCode = async () => {
    // 获取验证码
    // 整理数据
    let data: AuthCodeReq
    if (isEmail(ACLoginForm.emailOrPhone)) {
      data = { email: ACLoginForm.emailOrPhone }
    } else if (isPhone(ACLoginForm.emailOrPhone)) {
      data = { phone: ACLoginForm.emailOrPhone }
    } else {
      return
    }
    // 发送请求
    ACGetBtnProps.value.loading = true
    try {
      await getAuthCode({ data })
    } catch (err) {
      ElMessage.error('获取验证码失败')
    }
    ACGetBtnProps.value.loading = false
    // 倒计时
    ACGetBtnProps.value.disabled = true
    const frozenTime = 60
    let remainTime = frozenTime - 1
    const timer = setInterval(() => {
      ACGetBtnProps.value.text = `${remainTime--}s`
    }, 1000)
    setTimeout(() => {
      ACGetBtnProps.value.text = '获取验证码'
      ACGetBtnProps.value.disabled = false
      clearInterval(timer)
    }, frozenTime * 1000)
  }
  return { ACLoginFormRef, ACLoginForm, ACLoginRules, ACGetBtnProps, ACGetAuthCode, ACLogin }
}

// 密码登录hook
export function usePwdLogin(props: { readonly redirect?: string }) {
  const PWDLoginFormRef = ref<FormInstance>()
  const PWDLoginForm = reactive({
    username: '',
    password: ''
  })

  const PWDLoginRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 4, message: '用户名长度不能小于4', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'change' },
      { min: 6, message: '密码长度不能小于6', trigger: 'blur' }
    ]
  }
  const PWDLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    try {
      const isValid = await formEl.validate()
      if (!isValid) return
    } catch (error) {
      return
    }
    const loginUser = await login(PWDLoginForm)
    if (loginUser) {
      loginSuccessHandler(loginUser, props.redirect || DEFAULTREDIRECT)
    }
  }
  return { PWDLoginFormRef, PWDLoginForm, PWDLoginRules, PWDLogin }
}
