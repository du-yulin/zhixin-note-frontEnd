/**
 * @description: 用户信息仓库
 */
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

import type { LoginUser } from '@/types/api'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<LoginUser | null>(null)
    function $reset() {
      user.value = null
    }
    // const logout = async () => {
    //   await ElMessageBox.alert('确定要退出登录吗？', '确认', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   })
    //   try {
    //     await APILogout()
    //     Object.assign(user, { id: null, name: '', avatar: '' })
    //   } catch (error) {
    //     ElMessage.error('退出登录失败')
    //   }
    // }
    return { user,$reset }
  },
  { persist: true }
)


