<script setup lang="ts">
const { auth } = useSupabaseClient()

const message = useMessage()

const loading = ref(false)
const form = ref({
  email: '',
  password: '',
  // code: '',
})

async function signUp() {
  try {
    loading.value = true

    const { data, error } = await auth.signUp({
      email: form.value.email,
      password: form.value.email,
    })

    if (error) {
      message.error(error.message)
      return
    }

    message.success('注册成功')

    setTimeout(() => {
      navigateTo('/auth/login', { external: true })
    }, 1000)
  }
  finally {
    loading.value = false
  }
}

async function goToLogin() {
  await navigateTo('/auth/login', { external: true })
}

const user = useSupabaseUser()

watchEffect(() => {
  if (user.value)
    navigateTo('/')
})
</script>

<template>
  <div class="text-left">
    <n-spin :show="loading">
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
                :maxlength="16"
              >
                <template #prefix>
                  <Icon name="ri:lock-2-line" size="16" />
                </template>
              </n-input>
            </n-form-item>
            <!-- <n-form-item label="验证码" path="form.code">
              <n-input
                v-model:value="form.code" placeholder="验证码"
                :maxlength="4"
              >
                <template #prefix>
                  <Icon name="material-symbols:123" size="16" />
                </template>
              </n-input>
            </n-form-item> -->
            <n-form-item>
              <div class="space-y-4 w-full">
                <n-button type="primary" class="w-full" @click="signUp()">
                  注册
                </n-button>
                <n-button class="w-full flex" @click="goToLogin()">
                  返回登录
                </n-button>
              </div>
            </n-form-item>
          </n-form>
        </div>
      </div>
    </n-spin>
  </div>
</template>
