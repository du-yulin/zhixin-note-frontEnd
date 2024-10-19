<template>
  <div ref="itemRef" class="muticolumn-item" :style="itemStyle">
    <div class="muticolumn-item__content">
        <slot></slot>
    </div>
    <div
      v-if="props.resizable"
      ref="resizeRef"
      class="muticolumn-item__resize"
      :style="{ transform: `translateX(${resizebarTranslateX}px)` }"
      @mouseenter="onResizebarMouseenter"
      @mouseleave="onResizebarMouseleave"
      @mousedown="onResizebarMousedown"
    >
      <div class="muticolumn-item__resize-line" :style="resizeLineStyle"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref,onBeforeMount, computed } from 'vue'

const itemRef = ref<HTMLDivElement>()
const resizeRef = ref<HTMLDivElement>()
const isResizing = ref(false)
const isHovering = ref(false)

// 注册开始resize事件
const emit = defineEmits(['collapse', 'expand', 'end'])
const props = defineProps({
  resizable: {
    type: Boolean,
    default: true
  },
  collapsible: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number
  },
  minWidth: {
    type: Number
  },
  maxWidth: {
    type: Number
  },
  collapsedWidth: {
    type: Number,
    default: 0
  },
  resizebarWidth: {
    type: Number,
    default: 1
  },
  resizebarActiveWidth: {
    type: Number,
    default: 3
  },
  resizebarColor: {
    type: String,
    default: '#F0F2F5'
  },
  resizebarActiveColor: {
    type: String,
    default: '#409eff'
  }
})


const collapsible = ref(props.collapsible)
const width = ref(props.width)
const minWidth = ref(props.minWidth)
const maxWidth = ref(props.maxWidth)
const collapsedWidth = ref(props.collapsedWidth)
const transition = ref('none')



// 通过属性生成muticolumn-item样式
const itemStyle = computed(() => {
  return {
    width: width.value !== undefined ? width?.value + 'px' : 'auto',
    flex: width.value !== undefined ? '0 0 auto' : '1 1 auto',
    minWidth: minWidth.value !== undefined ? minWidth.value + 'px' : 'auto',
    maxWidth: maxWidth.value !== undefined ? maxWidth.value + 'px' : 'auto',
    transition: transition.value
  }
})
// 通过属性以及isResizing生成muticolumn-item__resize-line样式
const resizeLineStyle = computed(() => {
  return isResizing.value || isHovering.value
    ? {
        backgroundColor: props.resizebarActiveColor,
        width: props.resizebarActiveWidth + 'px'
      }
    : {
        backgroundColor: props.resizebarColor,
        width: props.resizebarWidth + 'px'
      }
})

// 计算resizebar的translateX
const resizebarTranslateX = computed(() => {
  return width.value === 0
    ? props.resizebarActiveWidth + 2
    : (props.resizebarWidth+4)/2
})
// resizebar鼠标事件相关
// 数据
const eventData = {
  startX: 0,
  rawWidth: 0
}
// 辅助函数
const getCurElWidth = () => {
  return itemRef.value?.offsetWidth || 0
}

const handleWidth = (rawWidth: number) => {
  // 处理最小宽度、设置过渡、设置宽度
  const _minWidth = props.minWidth ? props.minWidth : 0
  const _collapseWidth = 0.5*(_minWidth+collapsedWidth.value)
  if (collapsible.value) {
    if (rawWidth < _minWidth) {
      transition.value = 'all 0.3s'
      if (rawWidth < _collapseWidth) { // 折叠
        minWidth.value = collapsedWidth.value
        width.value = collapsedWidth.value
        emit('collapse',width.value)
        return
      } else if (rawWidth >= _collapseWidth) { // 展开
        minWidth.value = _minWidth
        emit('expand',width.value)
      }
    } else {
      transition.value = 'none'
    }
  }
  width.value = rawWidth
}
const finishWidth = (rawWidth: number) => {
  /**
   * 当宽度大于最大宽度时,返回maxWidth
   * 当宽度小于最小宽度时
   *  若collapsible==true
   *    rawWidth<0.5*props.minWidth：返回0
   *    rawWidth>=0.5*props.minWidth && rawWidth<props.minWidth： 返回props.minWidth
   *  否则
   *    返回props.minWidth
   * 否则 返回rawWidth
   */
  const _maxWidth = props.maxWidth
  const _minWidth = props.minWidth
  if (_maxWidth !== undefined && rawWidth > _maxWidth) {
    return _maxWidth
  }
  if (_minWidth !== undefined && rawWidth < _minWidth) {
    if (collapsible.value) {
      const _collapseWidth = 0.5*(_minWidth+collapsedWidth.value)
      if (rawWidth < _collapseWidth) {
        return collapsedWidth.value
      }
      if (rawWidth >= _collapseWidth && rawWidth < _minWidth) {
        return _minWidth
      }
    } else {
      return _minWidth
    }
  }
  return rawWidth
}
// 鼠标事件
const onResizebarMouseenter = () => {
  isHovering.value = true
}
const onResizebarMouseleave = () => {
  isHovering.value = false
}
const onResizebarMousemove = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  // 计算移动距离和原始宽度
  const mouseOffset = e.clientX - eventData.startX
  eventData.startX = e.clientX
  eventData.rawWidth = (eventData.rawWidth || width.value || getCurElWidth()) + mouseOffset
  // 处理折叠情况、设置宽度
  handleWidth(eventData.rawWidth)

}
const onResizebarMousedown = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isResizing.value = true
  eventData.startX = e.clientX
  document.addEventListener('mousemove', onResizebarMousemove)
  document.addEventListener('mouseup', onResizebarMouseup)
  // 修复鼠标从resizebar偏移出去后，鼠标样式失效问题
  document.body.style.cursor = 'ew-resize'
}

const onResizebarMouseup = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isResizing.value = false
  width.value = finishWidth(width.value!)
  // 清除eventData.rawWidth
  eventData.rawWidth = 0
  // 清除鼠标样式
  document.body.style.cursor = 'auto'
  // 发送end事件
  emit('end', width.value)
  // 移除监听事件
  document.removeEventListener('mousemove', onResizebarMousemove)
  document.removeEventListener('mouseup', onResizebarMouseup)
}

onBeforeMount(() => {
  // 初始化宽度
  if (width.value) {
    handleWidth(width.value)
  }
})

</script>

<style scoped lang="scss">
.muticolumn-item {
  position: relative;
  height: 100%;
  &__content {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  &__resize {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    height: 100%;
    cursor: ew-resize;
    padding: 0 2px;
    &-line {
      height: 100%;
      transition: all 0.3s ease;
    }
  }
}
</style>

