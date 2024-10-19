<template>
  <ResizableMutiColumn>
    <ResizableMutiColumnItem
      :width="300"
      :min-width="200"
      :collapsed-width="64"
      collapsible
      @collapse="isCollapsed = true"
      @expand="isCollapsed = false"
    >
      <AsideNav :is-collapsed="isCollapsed">
        <AsideNavItemGroup>
          <template #header>
            <div class="header"></div>
          </template>
          <AsideNavItem>
            <template #icon>
              <el-icon><i-ep-User /></el-icon>
            </template>
            法撒旦静安寺就发撒撒就阿萨艾弗森上帝发誓
          </AsideNavItem>
        </AsideNavItemGroup>
      </AsideNav>
    </ResizableMutiColumnItem>
    <ResizableMutiColumnItem>
      <div
        class="box"
        style="width: 100px; height: 100px; overflow: hidden; text-overflow: ellipsis"
      >
        Lorem ipsum dolor sit amet.
      </div>
    </ResizableMutiColumnItem>
  </ResizableMutiColumn>
</template>
<script setup>
import { ref } from 'vue'
import { AsideNav, AsideNavItem, AsideNavItemGroup } from '@/components/pc/asideNav'
import { ResizableMutiColumn, ResizableMutiColumnItem } from '@/components/pc/resizableMutiColumn'
const isCollapsed = ref(false)
</script>
<style scoped>
.box {
  width: 300px;
}
.header {
  height: 10px;
  background: #ccc;
}
</style>
