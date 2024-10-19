<template>
  <ul class="nav__item-group">
    <li class="item-group__header" :style="headerStyle">
      <slot name="header"></slot>
    </li>
    <ul class="item-group__body" :style="bodyStyle">
      <slot></slot>
    </ul>
  </ul>
</template>
<script setup lang="ts">
import {ref,computed, inject} from 'vue'
import type { Ref, DefineProps} from 'vue'

type Style = {
  [key: string]: string
}

const props = defineProps<{
  headerStyle?: Style
  bodyStyle?: Style
  collapsedHeaderStyle?: Style
  collapsedBodyStyle?: Style
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

const headerStyle = computed(() => {
  return navProps.isCollapsed? props.collapsedHeaderStyle : props.headerStyle
})
const bodyStyle = computed(() => {
  return navProps.isCollapsed? props.collapsedBodyStyle : props.bodyStyle
})

</script>
<style scoped>
ul{
  list-style: initial;
  margin: initial;
  padding: initial;
  unicode-bidi: initial;
}
li{
  display:block;
}
.nav__item-group {
  --item-group-header-padding: v-bind(navProps.itemPadding+'px')
}
.nav__item-group {
  flex:0 0 auto;
}
.item-group__header{
  padding: 0 var(--item-group-header-padding);
}
</style>