/**
 * @description home页面组合函数
 */
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

import { useUserSettingsStore } from '@/stores/userSettings'

// 初始化ui
export function useInitUi() {
  
  const userSettingsStore = useUserSettingsStore()
  // 侧边栏宽度
  const asidebarWidth = computed(() => {
    if (userSettingsStore.userSetting?.asideBarWidth) {
      return userSettingsStore.userSetting.asideBarWidth
    }
    return userSettingsStore.anonymousUserSetting.asideBarWidth
  })
  // 切换侧边栏宽度
  const toggleAsidebarWidth = (width: number) => {
    userSettingsStore.setUserSetting('asideBarWidth', width)
  }
  // 侧边栏折叠
  const isCollapsed = ref(false)
  // 侧边栏折叠后宽度
  const collapsedWidth = 48
  // 侧边导航项图标宽度
  const itemIconWidth = 36
  // 侧边导航项左右内边距
  const itemPadding = (collapsedWidth - itemIconWidth) / 2

  // 主题
  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  // 默认选择
  const route = useRoute()
  const defaultSelectedItem = computed(() => `/${route.path.split('/')[1]}`)

  return {
    asidebarWidth,
    toggleAsidebarWidth,
    isCollapsed,
    collapsedWidth,
    itemIconWidth,
    itemPadding,
    isDark,
    toggleDark,
    defaultSelectedItem
  }
}
