<template>
  <li class="nav__item" :class="{ active: itemIsAcitve }" ref="itemRef">
    <div class="item__icon">
      <slot name="icon"></slot>
    </div>
    <div class="item__title" :class="{ hidden: navProps.isCollapsed }">
      <slot></slot>
    </div>
  </li>
</template>
<script lang="ts" setup>
import { computed, inject, ref, watch, type DefineProps } from 'vue'
import { useRoute } from 'vue-router'
import { useDebounceFn, useElementSize } from '@vueuse/core'

const props = defineProps<{
  to?: string
  height?: number
  hoverBgColor?: string
  hoverTextColor?: string
  activeBgColor?: string
  activeTextColor?: string
}>()
type NavProps = {
  isCollapsed: boolean
  itemHeight: number
  itemPadding: number
  itemIconWidth: number
  itemBorderRadius: number
  itemHoverBgColor: string
  itemHoverTextColor: string
  itemActiveBgColor: string
  itemActiveTextColor: string
}
const navProps = inject('navProps') as DefineProps<NavProps, never>

// 折叠时，计算padding
const itemRef = ref<HTMLLIElement>()
const collapsedPadding = ref(0)
const itemCurSize = useElementSize(itemRef)
const debouncedGetCollapsedPadding = useDebounceFn((stop) => {
  console.log(itemCurSize.width.value)
  if (!navProps.isCollapsed) return
  collapsedPadding.value = (itemCurSize.width.value - navProps.itemIconWidth) / 2
  stop()
}, 50)
const stop = watch(
  () => itemCurSize.width.value,
  () => {
    console.log('resizing')
    debouncedGetCollapsedPadding(stop)
  }
)

const style = computed(() => {
  return {
    padding: navProps.itemPadding + 'px',
    collapsedPadding: collapsedPadding.value + 'px',
    height: (props.height ?? navProps.itemHeight) + 'px',
    iconWidth: navProps.itemIconWidth + 'px',
    borderRadius: navProps.itemBorderRadius + 'px',
    hoverBgColor: props.hoverBgColor ?? navProps.itemHoverBgColor,
    hoverTextColor: props.hoverTextColor ?? navProps.itemHoverTextColor,
    activeBgColor: props.activeBgColor ?? navProps.itemActiveBgColor,
    activeTextColor: props.activeTextColor ?? navProps.itemActiveTextColor
  }
})

// 活动状态样式
const route = useRoute()
const itemIsAcitve = ref(false)
watch(
  () => route.path,
  () => {
    if (!props.to) return
    // 判断to表示的路由地址是否出现在route.match中
    itemIsAcitve.value = route.matched.some((item) => item.path === props.to)
  }
)
</script>
<style scoped>
.nav__item {
  --item-padding: v-bind(style.padding);
  --item-collapsed-padding: v-bind(style.collapsedPadding);
  --item-height: v-bind(style.height);
  --item-icon-width: v-bind(style.iconWidth);
  --item-border-radius: v-bind(style.borderRadius);
  --item-hover-text-color: v-bind(style.hoverTextColor);
  --item-hover-bg-color: v-bind(style.hoverBgColor);
  --item-active-text-color: v-bind(style.activeTextColor);
  --item-active-bg-color: v-bind(style.activeBgColor);
}
.nav__item {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  height: var(--item-height);
  padding: 0 var(--item-padding);
  border-radius: var(--item-border-radius);
  cursor: pointer;
  user-select: none;
  transition: padding 0.3s ease;
}
.nav__item:has(.item__title:is(.hidden)) {
  padding: 0 var(--item-collapsed-padding);
}

.nav__item:hover {
  background-color: var(--item-hover-bg-color);
  color: var(--item-hover-text-color);
}
.nav__item:is(.active) {
  background-color: var(--item-active-bg-color);
  color: var(--item-active-text-color);
}
.item__icon {
  flex: 0 0 auto;
  width: var(--item-icon-width);
  height: var(--item-icon-width);
  display: flex;
  align-items: center;
  justify-content: center;
}
.item__title {
  flex: 1;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
}
.item__title:is(.hidden) {
  display: none;
}
</style>
