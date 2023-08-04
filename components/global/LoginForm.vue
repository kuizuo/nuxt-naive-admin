<script setup lang="ts">
import { createDiscreteApi } from 'naive-ui'
const emit = defineEmits(['success'])

const { signIn, getProviders } = useSession()

const providers = await getProviders()
const { message } = createDiscreteApi(['message'])

const loading = ref(false)
const form = ref({
  username: 'admin',
  password: '123456',
})

async function login() {
  loading.value = true
  const { error, url } = await signIn('credentials', {
    ...form.value,
    redirect: false,
  })
  loading.value = false

  if (error) {
    message.error(error)
    return
  }

  message.success('登录成功')

  emit('success')

  if (url)
    return navigateTo(url, { external: true })

  else
    return navigateTo('/', { external: true })
}

async function goToRegister() {
  emit('success')
  await navigateTo('/register', { external: true })
}
</script>

<template>
  <div class="text-left">
    <n-spin :show="loading">
      <template #icon>
        <Icon name="line-md:loading-loop" />
      </template>
      <div class="flex bg-cover">
        <div class="flex flex-col gap-2 justify-center items-center mx-auto">
          <div class="text-center text-2xl font-semibold mb-4">
            Login
          </div>
          <n-form ref="formRef" :model="form" :show-label="false">
            <n-form-item label="账号" path="form.username">
              <n-input v-model:value="form.username" placeholder="账号">
                <template #prefix>
                  <i i-ri:user-3-line />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="密码" path="form.password">
              <n-input
                v-model:value="form.password" type="password" show-password-on="mousedown" placeholder="密码"
                :maxlength="16" @keyup.enter="login()"
              >
                <template #prefix>
                  <i i-ri:lock-2-line />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item>
              <n-button type="primary" class="w-full" @click="login()">
                登录
              </n-button>
            </n-form-item>
          </n-form>
          <div
            class="w-full flex my-2 -mt-4 text-center truncate
            before:content-[''] before:relative before:top-1/2 before:w-1/2 before:translate-y-1/2 before:h-0 before:border-t-[1px] before:border-gray-200 dark:border-gray-700
            after:content-[''] after:relative after:top-1/2 after:w-1/2 after:translate-y-1/2 after:h-0 after:border-t-[1px] after:border-gray-200 dark:border-gray-700"
          >
            <span class="px-2 text-gray-4 text-sm">or</span>
          </div>
          <div class="space-y-4 w-full">
            <n-button v-if="providers.github" class="w-full flex" @click="signIn('github')">
              <i class="i-ri-github-line text-md mr-1" />
              Sign in with Github
            </n-button>
            <n-button class="w-full flex" @click="goToRegister()">
              <i class="i-ri-login-box-line text-md mr-1" />
              Register
            </n-button>
          </div>
        </div>
      </div>
    </n-spin>
  </div>
</template>

<style scoped>

</style>
