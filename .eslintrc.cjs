/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // overrides: [
  //   {
  //     files: ['src/components/**/index.vue', 'src/views/**/index.vue'], // 匹配views和components目录中的index.vue
  //     rules: {
  //       'vue/multi-word-component-names': 'off' // 允许组件名称为单个单词
  //     }
  //   }
  // ]
}
