<template>
  <div class="pg-login">
    <div class="pg-login__content">
      <div class="login-box">
        <img class="login-box__logo" src="@/assets/img/logo.png" alt="" />
        <el-tabs v-model="activeTab">
          <el-tab-pane label="验证码登录" name="authcode">
            <el-form ref="ACLoginFormRef" :model="ACLoginForm" :rules="ACLoginRules">
              <el-form-item label="手机/邮箱" prop="emailOrPhone" label-position="top">
                <el-input
                  placeholder="请输入手机号或邮箱"
                  autofocus
                  autocomplete="on"
                  v-model.trim="ACLoginForm.emailOrPhone"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="authcode" label-position="top">
                <div class="login-box__row">
                  <el-input
                    placeholder="请输入验证码"
                    clearable
                    v-model.trim="ACLoginForm.authcode"
                  ></el-input>
                  <el-button
                    class="btn-authcode"
                    type="primary"
                    :disabled="ACGetBtnProps.disabled"
                    :loading="ACGetBtnProps.loading"
                    @click="ACGetAuthCode"
                    >{{ ACGetBtnProps.text }}</el-button
                  >
                </div>
              </el-form-item>
              <el-form-item>
                <el-button class="btn-login" type="primary" @click="ACLogin(ACLoginFormRef)">
                  一键登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="密码登录" name="password">
            <el-form ref="PWDLoginFormRef" :model="PWDLoginForm" :rules="PWDLoginRules" status-icon>
              <el-form-item label="用户名" prop="username" label-position="top">
                <el-input
                  placeholder="请输入用户名"
                  autocomplete="username"
                  v-model.trim="PWDLoginForm.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" label-position="top">
                <el-input
                  type="password"
                  placeholder="请输入密码"
                  autocomplete="current-password"
                  show-password
                  v-model.trim="PWDLoginForm.password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btn-login" type="primary" @click="PWDLogin(PWDLoginFormRef)"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div class="third-party-head">
          <el-text size="large">其他方式登录</el-text>
        </div>
        <div class="third-party">
          <el-button tag="a" round>
            <img class="third-party__icon" src="@/assets/icon/github.svg" alt="" />
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDark } from '@vueuse/core';

import { useAcLogin, usePwdLogin } from '@/hooks/pc/views/login'

useDark()
const activeTab = ref('authcode')
const props = defineProps(['redirect'])

const { ACLoginFormRef, ACLoginForm, ACLoginRules, ACGetBtnProps, ACGetAuthCode, ACLogin } =
  useAcLogin(props)
const { PWDLoginFormRef, PWDLoginForm, PWDLoginRules, PWDLogin } = usePwdLogin(props)
</script>

<style scoped lang="scss">
.pg-login {
  height: 100%;
  position: relative;
  background:
    url('@/assets/img/login-bg.png') no-repeat left / cover,
    var(--el-bg-color-page);

  &__content {
    position: absolute;
    left: 50%;
    width: 50%;
    height: 100%;
    @include flex-center;
  }
  @include respon-to(phone) {
    background: none;
    &__content {
      width: 100%;
      left: 0;
    }
  }
  @include respon-to(tablet) {
    &__content {
      width: 100%;
      left: 0;
    }
  }
}

.login-box {
  width: 300px;
  border-radius: 20px;
  padding: 50px 50px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
  &__logo {
    width: 50%;
    margin: 0 auto 30px auto;
    display: block;
  }
  &__row {
    width: 100%;
    display: flex;
  }
  @include respon-to(phone) {
    width: 100%;
    padding: 50px;
    box-shadow: none;
    background: none;
    backdrop-filter: none;
  }
}
.btn-authcode {
  margin-left: 10px;
  width: 150px;
  flex-shrink: 0;
  @include respon-to(phone) {
    width: 50%;
  }
}
.btn-login {
  width: 100%;
  margin-top: 10px;
}
.third-party-head {
  cursor: default;
  margin: 15px 0;
}
.third-party {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>
