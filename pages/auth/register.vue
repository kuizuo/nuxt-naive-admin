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
    <NSpin :show="loading">
      <div class="flex bg-cover">
        <div class="flex flex-col gap-2 justify-center items-center mx-auto">
          <NForm :model="form" :show-label="false">
            <NFormItem label="邮箱" path="form.email">
              <NInput v-model:value="form.email" placeholder="邮箱">
                <template #prefix>
                  <Icon name="ri:mail-line" size="16" />
                </template>
              </NInput>
            </NFormItem>
            <NFormItem label="密码" path="form.password">
              <NInput
                v-model:value="form.password" type="password" show-password-on="mousedown" placeholder="密码"
                :maxlength="16"
              >
                <template #prefix>
                  <Icon name="ri:lock-2-line" size="16" />
                </template>
              </NInput>
            </NFormItem>
            <!-- <NFormItem label="验证码" path="form.code">
              <NInput
                v-model:value="form.code" placeholder="验证码"
                :maxlength="4"
              >
                <template #prefix>
                  <Icon name="material-symbols:123" size="16" />
                </template>
              </NInput>
            </NFormItem> -->
            <NFormItem>
              <div class="space-y-4 w-full">
                <NButton type="primary" class="w-full" @click="signUp()">
                  注册
                </NButton>
                <NButton class="w-full flex" @click="goToLogin()">
                  返回登录
                </NButton>
              </div>
            </NFormItem>
          </NForm>
        </div>
      </div>
    </NSpin>
  </div>
</template>
