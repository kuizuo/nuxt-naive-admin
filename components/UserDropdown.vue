<script lang="tsx" setup>
import { createDiscreteApi } from 'naive-ui'
import { Icon } from '#components'
const { status, data, signOut, signIn, getProviders } = useSession()
const providers = await getProviders()
const router = useRouter()

const { message } = createDiscreteApi(['message'])

const showModal = ref(false)
const loading = ref(false)
const user = computed(() => data.value?.user)

const form = ref({
  username: 'test',
  password: '123456',
})

function renderIcon(icon: string) {
  return () => <Icon name={icon}></Icon>
}

const options = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon('ri:user-3-line'),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('ri:logout-box-r-line'),
  },
]

function handleSelect(key: string) {
  switch (key) {
    case 'profile':
      router.push({ name: 'me' })
      break
    case 'logout':
      signOut()
      break
  }
}

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

  showModal.value = false

  return navigateTo(url, { external: true })
}

definePageMeta({
  auth: false,
})
</script>

<template>
  <div>
    <div v-if="status === 'authenticated'" class="flex">
      <n-dropdown trigger="hover" placement="bottom-center" :options="options" @select="handleSelect">
        <n-avatar size="small" round :src="user?.image">
          <span v-if="!user?.image">{{ user?.name }}</span>
        </n-avatar>
      </n-dropdown>
    </div>
    <div v-else>
      <n-button size="small" type="primary" @click="showModal = true">
        登录
      </n-button>
      <n-modal
        v-model:show="showModal"
        :mask-closable="true"
        preset="card"
        size="large"
        :bordered="false"
        :closable="false"
        :style="{ 'max-width': '350px' }"
        transform-origin="center"
      >
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
                  <n-button type="primary" w-full @click="login()">
                    登录
                  </n-button>
                </n-form-item>
              </n-form>
              <div
                class="w-full flex my-2 -mt-4 text-center truncate before:(content-none relative top-50% w-50% translate-y-50% h-0 b-t-1 b-gray-2 dark:b-gray-7) after:(content-none relative top-50% w-50% translate-y-50% h-0 b-t-1 b-gray-2 dark:b-gray-7)"
              >
                <span px-2 text-gray-4 text-sm>or</span>
              </div>
              <div class="space-y-4 w-full">
                <n-button v-if="providers.github" class="w-full flex" @click="signIn('github')">
                  <i i-ri-github-line text-lg mr-1 />
                  Sign in with Github
                </n-button>
              </div>
            </div>
          </div>
        </n-spin>
      </n-modal>
    </div>
  </div>
</template>

