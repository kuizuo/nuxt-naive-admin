<script setup lang="ts">
const { auth } = useSupabaseClient()
const user = useSupabaseUser()

const message = useMessage()

const loading = ref(false)
const form = ref({
  email: '',
  // code: '',
})

async function resetPassword() {
  try {
    loading.value = true

    const { data, error } = await auth.resetPasswordForEmail(form.value.email, {
      redirectTo: `${useRuntimeConfig().public.baseUrl}/auth/update-password`,
    })

    if (error) {
      message.error(error.message)
      return
    }

    message.success('发送成功,请查收你的邮箱')
  }
  finally {
    loading.value = false
  }
}

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
          <NH2>重置密码</NH2>
          <NForm :model="form" :show-label="false">
            <NFormItem label="邮箱" path="form.email">
              <NInput v-model:value="form.email" placeholder="邮箱">
                <template #prefix>
                  <Icon name="ri:mail-line" size="16" />
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
                <NButton type="primary" class="w-full" @click="resetPassword()">
                  发送重置邮件
                </NButton>
                <NButton class="w-full flex" @click="navigateTo('/auth/login', { external: true })">
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
