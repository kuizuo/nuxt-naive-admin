<script setup lang="ts">
const { signIn, getProviders, status } = useSession()
const router = useRouter()
const providers = await getProviders()

if (status.value === 'authenticated')
  router.push({ path: '/' })

const form = ref({
  username: 'admin',
  password: '123456',
  captcha: '',
})

async function login() {
  try {
    await signIn('credentials', toRaw(form.value))
  }
  catch (error) {
    console.log(error)
  }
}

definePageMeta({
  auth: false,
})
</script>

<template>
  <div class="flex bg-cover">
    <div class="flex flex-col gap-4 justify-center items-center mx-auto">
      <div class="text-center text-2xl font-semibold">
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
          <n-button type="primary" w-full @click="login()">
            登录
          </n-button>
        </n-form-item>
      </n-form>
      <div class="-mt-4 text-center text-sm text-gray-400">
        — or —
      </div>
      <div class="space-y-4 w-full">
        <n-button v-if="providers.github" class="w-full flex justify-around" @click="signIn('github')">
          <i i-ri-github-line text-lg mr-1 />
          Sign in with Github
        </n-button>
      </div>
    </div>
  </div>
</template>
