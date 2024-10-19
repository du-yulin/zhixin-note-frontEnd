<template>
  <ul class="nav" :class="{ 'nav--collapsed': isCollapsed }">
    <slot></slot>
  </ul>
</template>
<script setup lang="ts">
import { ref, computed, provide, toRefs, watch } from 'vue'
const props = withDefaults(defineProps<{
  isCollapsed?: boolean
  itemHeight?: number
  itemPadding?: number
  itemIconWidth?: number
  itemBorderRadius?: number
  itemHoverBgColor?: string
  itemHoverTextColor?: string
  itemActiveBgColor?: string
  itemActiveTextColor?: string
}>(), {
  isCollapsed: false,
  itemHeight: 48,
  itemPadding: 10,
  itemIconWidth: 24,
  itemBorderRadius: 0,
  itemHoverBgColor: 'var(--el-color-primary-light-9)',
  itemHoverTextColor: 'var(--el-color-primary)',
  itemActiveBgColor: 'initial',
  itemActiveTextColor: 'var(--el-color-primary)'
})
provide('navProps', props)

</script>
<style scoped>
.nav {
  /* 列表样式重置 */
  list-style: initial;
  margin: initial;
  padding: initial;
  unicode-bidi: initial;
}
.nav {
  display: flex;
  flex-direction: column;
}
</style>
