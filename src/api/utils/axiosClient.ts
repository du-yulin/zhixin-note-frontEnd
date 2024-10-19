import axios, { HttpStatusCode } from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

import router from '@/router'
import { useUserStore } from '@/stores/user'

const client = axios.create({
  withCredentials: true
})

function unauthOrForbiddenhandler(error: AxiosError) {
  if (router.currentRoute.value.name === 'login') {
    ElMessage.error('登录失败')
  } else {
    ElMessageBox.alert('登录已过期，请重新登录', '提示', {
      confirmButtonText: '确定',
      type: 'error'
    })
      .then(() => {
        useUserStore().$reset()
        router.push({
          name: 'login',
          params: {
            redirect: router.currentRoute.value.fullPath
          }
        })
      })
      .catch(() => {})
  }
}

client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case HttpStatusCode.BadRequest:
          ElMessage.error('请求错误')
          break
        case HttpStatusCode.Unauthorized:
          unauthOrForbiddenhandler(error)
          break
        case HttpStatusCode.Forbidden:
          unauthOrForbiddenhandler(error)
          break
        case HttpStatusCode.NotFound:
          ElMessage.error('请求资源不存在')
          break
        case HttpStatusCode.InternalServerError:
          ElMessage.error('服务器错误')
          return
      }
      return Promise.reject(error)
    } else if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时')
    } else if (error.code === 'ERR_NETWORK') {
      ElMessage.error('网络错误')
    } else {
      ElMessage.error('未知错误')
    }
  }
)

export default client
