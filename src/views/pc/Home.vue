<template>
  <ResizableMutiColumn>
    <ResizableMutiColumnItem
      :width="ui.asidebarWidth.value"
      :min-width="150"
      :max-width="450"
      :resizebar-width="0"
      collapsible
      :collapsed-width="ui.collapsedWidth"
      @collapse="ui.isCollapsed.value = true"
      @expand="ui.isCollapsed.value = false"
      @end="ui.toggleAsidebarWidth"
    >
      <el-menu
        class="menu menu--flex-column"
        :default-active="ui.defaultSelectedItem.value"
        :collapse="ui.isCollapsed.value"
        router
      >
        <!-- 用户信息 -->
        <el-menu-item index="/profile" class="user-item">
          <el-icon>
            <el-avatar :size="ui.itemIconWidth" class="user-item__avatar" :src="user?.avatar || ''" />
          </el-icon>
          <template #title>
            <div class="user-item__name">{{ user?.name || '未登录' }}</div>
          </template>
        </el-menu-item>
        <!-- 导航项 -->
        <el-menu-item-group class="menu-item-group--banlance-title">
          <template #title>
            <el-divider class="menu-item-group__divider"></el-divider>
          </template>
          <el-menu-item index="/notes">
            <el-icon><i-ep-Notebook /></el-icon>
            <template #title>我的笔记</template>
          </el-menu-item>
          <el-menu-item index="/reviews">
            <el-icon><i-ep-Refresh /></el-icon>
            <template #title>今日复习</template>
          </el-menu-item>
          <el-menu-item index="/favorites">
            <el-icon><i-ep-CollectionTag /></el-icon>
            <template #title>我的收藏</template>
          </el-menu-item>
          <el-menu-item index="/following">
            <el-icon><i-ep-User /></el-icon>
            <template #title>我的关注</template>
          </el-menu-item>
          <el-menu-item index="/garbages">
            <el-icon><i-ep-Delete /></el-icon>
            <template #title>回收箱</template>
          </el-menu-item>
        </el-menu-item-group>
        <!-- 最近笔记 -->
        <el-menu-item-group class="menu-item-group--shrunk">
          <template #title>
            <el-divider class="menu-item-group__divider"></el-divider>
          </template>
          <el-menu-item
            v-for="item in userHistory"
            :key="item.id"
            :index=" `/notes/${item.id}`"
            class="history-item"
          >
            <el-icon><i-ep-Document /></el-icon>
            <template #title>
              <div class="history-item__name">{{ item.title }}</div>
            </template>
          </el-menu-item>
        </el-menu-item-group>
        <!-- 底部设置 -->
        <el-menu-item-group class="menu-item-group--banlance-title">
          <template #title>
            <el-divider class="menu-item-group__divider"></el-divider>
          </template>
          <el-menu-item @click="ui.toggleDark()">
            <el-icon>
              <i-ep-Moon v-if="ui.isDark.value" />
              <i-ep-Sunny v-else />
            </el-icon>
            <template #title>
              <span v-if="ui.isDark.value">夜间模式</span>
              <span v-else>白天模式</span>
            </template>
          </el-menu-item>
          <el-menu-item>
            <el-icon><i-ep-InfoFilled /></el-icon>
            <template #title>关于我们</template>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
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

import ResizableMutiColumn from '@/components/pc/resizableMutiColumn/ResizableMutiColumn.vue'
import ResizableMutiColumnItem from '@/components/pc/resizableMutiColumn/ResizableMutiColumnItem.vue'
import { useUserStore } from '@/stores/user'
import { useHistoryStore } from '@/stores/userHistory'
import { useInitUi } from '@/hooks/pc/views/home'

// ui
const ui = useInitUi()
const { user } = storeToRefs(useUserStore())
const { userHistory } = storeToRefs(useHistoryStore())
</script>

<style scoped>
.menu {
  --el-menu-base-level-padding:v-bind(ui.itemPadding+'px');
  --el-menu-icon-width:v-bind(ui.itemIconWidth+'px');
  height: 100%;
  width: 100%;
  user-select: none;
  background-color: var(--el-fill-color-lighter);
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
  margin: 0;
}
</style>
