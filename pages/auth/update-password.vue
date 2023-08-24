<script setup lang="ts">
const { auth } = useSupabaseClient()

const message = useMessage()

const loading = ref(false)
const form = ref({
  password: '',
})

async function updatePassword() {
  const { data, error } = await auth
    .updateUser({ password: form.value.password })

  if (error) {
    message.error(error.message)
    return
  }

  message.success('密码更新成功')
  return navigateTo('/')
}
</script>

<template>
  <div class="text-left">
    <NSpin :show="loading">
      <div class="flex bg-cover">
        <div class="flex flex-col gap-2 justify-center items-center mx-auto">
          <NH2>更新密码</NH2>
          <NForm :model="form" :show-label="false">
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
            <NFormItem>
              <div class="space-y-4 w-full">
                <NButton type="primary" class="w-full" @click="updatePassword()">
                  更新密码
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
