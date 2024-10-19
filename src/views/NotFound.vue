<template>
  <div class="not-found-page">
    <el-empty description="页面未找到...">
      <el-button type="primary" round @click="redirect2Home">返回首页</el-button>
    </el-empty>
  </div>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const redirect2Home = () => {
  router.push('/')
}
</script>
<style scoped lang="scss">
.not-found-page {
  width: 100%;
  height: 100%;
}

</style>