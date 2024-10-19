import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import 'normalize.css' // 样式重置
import './assets/css/main.css'
// import 'element-plus/theme-chalk/el-loading.css' // 加载loading样式
import 'element-plus/theme-chalk/el-message.css' // 消息提示样式
import 'element-plus/theme-chalk/el-message-box.css' // 弹窗样式
import 'element-plus/theme-chalk/dark/css-vars.css'// element-plus暗黑主题

import '@/assets/scss/epExtend.scss'// el-plus样式扩展


const app = createApp(App)

const pinia = createPinia()
// pinia持久化插件
pinia.use(piniaPersistedState)

app.use(pinia)
app.use(router)

app.mount('#app')
