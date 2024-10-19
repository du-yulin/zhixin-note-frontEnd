import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// element-plus按需自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// icons 自动导入
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// postcss-preset-env
import PostcssPresetEnv from 'postcss-preset-env'
// inspect
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(mode)
  const env = loadEnv(mode, process.cwd())
  console.log(env)
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(), // 自动导入ElementPlus相关函数
          IconsResolver({ // 自动导入图标组件
            // prefix: 'icon'
          })
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(), // 自动注册ElementPlus组件
          IconsResolver({ // 自动注册图标组件
            enabledCollections: ['ep']
          })
        ]
      }),
      Icons({
        autoInstall: true
      }),
      Inspect(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      // 开发服务器配置
      // host: '0.0.0.0', // 监听所有地址
      port: 3000, // 端口号
      open: true, // 自动打开浏览器
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      // 配置css
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/layout.scss";
          @import "@/assets/scss/responsive.scss";`
        }
      },
      postcss: {
        plugins: [PostcssPresetEnv()]
      }
    }
  }
})
