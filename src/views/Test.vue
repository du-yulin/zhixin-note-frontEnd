<template>
  <ResizableMutiColumn>
    <ResizableMutiColumnItem
      :width="ui.asidebarWidth.value"
      :min-width="150"
      :max-width="450"
      :resizebar-width="1"
      collapsible
      :collapsed-width="ui.collapsedWidth"
      @collapse="ui.isCollapsed.value = true"
      @expand="ui.isCollapsed.value = false"
      @end="ui.toggleAsidebarWidth"
    >
      <div class="nav" :class="{ 'nav--collapsed': ui.isCollapsed.value }">
        <div class="nav__item-group">
          <div class="nav__item user-info">
            <el-avatar class="nav__item-icon" :size="ui.itemIconWidth" :src="user?.avatar || ''" />
            <div class="nav__item-title">{{ user?.name || '未登录' }}</div>
          </div>
        </div>
        <div class="nav__item-group main-nav"></div>
        <div class="nav__item-group">
          <div class="nav__item" @click="ui.toggleDark()">
            <div class="nav__item-icon">
              <el-icon>
                <i-ep-Moon v-if="ui.isDark.value" />
                <i-ep-Sunny v-else />
              </el-icon>
            </div>
            <div class="nav__item-title">
              <span v-if="ui.isDark.value">夜间模式</span>
              <span v-else>白天模式</span>
            </div>
          </div>
          <div class="nav__item">
            <div class="nav__item-icon">
              <el-icon><i-ep-InfoFilled /></el-icon>
            </div>
            <div class="nav__item-title">关于我们</div>
          </div>
        </div>
      </div>
    </ResizableMutiColumnItem>
    <ResizableMutiColumnItem>
      <router-view> </router-view>
    </ResizableMutiColumnItem>
  </ResizableMutiColumn>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { ResizableMutiColumn, ResizableMutiColumnItem } from '@/components/pc/resizableMutiColumn'
import { useUserStore } from '@/stores/user'
import { useHistoryStore } from '@/stores/userHistory'
import { useInitUi } from '@/hooks/pc/views/home'

// ui
const ui = useInitUi()

const { user } = storeToRefs(useUserStore())
const { userHistory } = storeToRefs(useHistoryStore())
</script>

<style scoped>
/* nav通用布局 */
.nav {
  --item-padding: v-bind(ui.itemPadding+'px');
  --item-icon-width: v-bind(ui.itemIconWidth+'px');
  --item-hover-bg-color: initial;
  --item-hover-text-color: var(--el-color-primary);
  --item-height: 48px;
  --item-border-radius: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.nav:is(.nav--collapsed) .nav__item-title {
  display: none;
}
.nav__item-group {
  flex: 0 0 auto;
}
.nav__item {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 0 var(--item-padding);
  height: var(--item-height);
  border-radius: var(--item-border-radius);
}
.nav__item:hover {
  cursor: pointer;
  background-color: var(--item-hover-bg-color);
  color: var(--item-hover-text-color);
}
.nav__item-icon {
  flex: 0 0 auto;
  width: var(--item-icon-width);
  height: var(--item-icon-width);
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav__item-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}


.user-info {
  height: 64px;
}
.main-nav {
  flex: 1;
}

.menu {
  height: 100%;
  width: 100%;
  user-select: none;
  background-color: var(--el-fill-color-lighter);
}
.el-menu-item {
  color: var(--el-text-color-primary);
}
.user-item {
  --el-menu-hover-bg-color: initial;
  --el-menu-item-height: 64px;
}
.user-item__name {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: var(--el-font-size-medium);
}
.history-item {
  --el-menu-item-height: 36px;
  color: var(--el-text-color-regular);
}
.history-item__name {
  overflow: hidden;
  text-overflow: ellipsis;
}
.menu-item-group__divider {
  margin: 8px 0;
}
</style>
