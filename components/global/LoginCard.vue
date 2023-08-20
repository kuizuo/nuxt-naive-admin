<script setup lang='ts'>
import { createDiscreteApi } from 'naive-ui'

const emit = defineEmits<{
  (e: 'success'): void
}>()

const user = useSupabaseUser()

const { auth } = useSupabaseClient()

const { message } = createDiscreteApi(['message'])

const redirectTo = `${useRuntimeConfig().public.baseUrl}/auth/confirm`

const loading = ref(false)
const form = ref({
  email: '',
  password: '',
})

async function login() {
  loading.value = true

  const { data, error } = await auth.signInWithPassword({
    email: form.value.email,
    password: form.value.password,
  })

  loading.value = false

  if (error) {
    message.error(error.message)
    return
  }

  message.success('登录成功')
  emit('success')
  return navigateTo('/', { external: true })
}

async function loginWithGithub() {
  loading.value = true

  const { data, error } = await auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })
  loading.value = false
}

async function goToRegister() {
  await navigateTo('/auth/register', { external: true })
}

watchEffect(() => {
  if (user.value)
    navigateTo('/')
})
</script>

<template>
  <div class="text-left">
    <n-spin :show="loading">
      <h2 class="my-6 text-center text-2xl font-extrabold u-text-white">
        登录你的账号
      </h2>
      <div class="flex bg-cover">
        <div class="flex flex-col gap-2 justify-center items-center mx-auto">
          <n-form :model="form" :show-label="false">
            <n-form-item label="邮箱" path="form.email">
              <n-input v-model:value="form.email" placeholder="邮箱">
                <template #prefix>
                  <Icon name="ri:mail-line" size="16" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="密码" path="form.password">
              <n-input
                v-model:value="form.password" type="password" show-password-on="mousedown" placeholder="密码"
                :maxlength="16" @keyup.enter="login()"
              >
                <template #prefix>
                  <Icon name="ri:lock-2-line" size="16" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item>
              <n-space justify="space-between" class="w-full">
                <n-checkbox class="text-sm">
                  记住我
                </n-checkbox>
                <span>忘记密码</span>
              </n-space>
            </n-form-item>
            <n-form-item>
              <n-button type="primary" class="w-full" @click="login()">
                登录
              </n-button>
            </n-form-item>
          </n-form>
          <div
            class="w-full flex my-2 -mt-4 text-center truncate
            before:content-[''] before:relative before:top-1/2 before:w-1/2 before:translate-y-1/2 before:h-0 before:border-t-[1px] before:border-gray-200 before:dark:border-gray-700
            after:content-[''] after:relative after:top-1/2 after:w-1/2 after:translate-y-1/2 after:h-0 after:border-t-[1px] after:border-gray-200 after:dark:border-gray-700"
          >
            <span class="px-2 text-gray-4 text-sm">或者</span>
          </div>
          <div class="space-y-4 w-full">
            <n-button class="w-full flex" @click="loginWithGithub()">
              <i class="i-ri-github-line text-md mr-1" />
              使用 Github 登录
            </n-button>
            <n-button class="w-full flex" @click="goToRegister()">
              注册
            </n-button>
          </div>
        </div>
      </div>
    </n-spin>
  </div>
</template>
