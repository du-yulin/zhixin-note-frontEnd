/**
 * @description 用户设置相关状态管理
 */
import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import { useUserStore } from './user'

// 最大储存数
const MAX_USER_SETTINGS_NUMBER = 10
// 默认设置值
const DFAULTSETTING = {
  asideBarWidth: 150
}

interface UserSetting {
  asideBarWidth: number // 侧边栏宽度
}
interface UsersSettings {
  [key: number | string]: UserSetting
}

export const useUserSettingsStore = defineStore(
  'userSettings',
  () => {
    const allSettings = reactive<UsersSettings>({
      default: { ...DFAULTSETTING }
    })
    const userStore = useUserStore()
    // 匿名用户设置
    const anonymousUserSetting = computed(() => {
      return allSettings['default']
    })

    // 获取用户设置
    const userSetting = computed(() => {
      return allSettings[userStore.user?.id || 'default']
    })
    // 添加用户设置
    const addUserSetting = (userId: Id, setting?: UserSetting) => {
      if (allSettings[userId]) return
      // 判断是否超过最大储存数
      if (Object.keys(allSettings).length >= MAX_USER_SETTINGS_NUMBER) {
        // 删除第一个
        delete allSettings[Object.keys(allSettings)[0]]
      }
      allSettings[userId] = setting || { ...DFAULTSETTING }
    }
    // 设置当前用户设置
    const setUserSetting = <T extends keyof UserSetting, V extends UserSetting[T]>(
      key: T,
      value: V
    ) => {
      const userId = userStore.user?.id || 'default'
      addUserSetting(userId)
      allSettings[userId][key] = value
    }

    return { allSettings,anonymousUserSetting, userSetting, addUserSetting, setUserSetting }
  },
  {
    persist: true
  }
)
