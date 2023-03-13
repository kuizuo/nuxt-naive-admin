<script lang="tsx" setup>
import { Icon } from '#components'
const { status, data, signOut, signIn, getProviders } = useSession()
const router = useRouter()

const showModal = ref(false)
const user = computed(() => data.value?.user)

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

function handleSuccess() {
  showModal.value = false
}

definePageMeta({
  auth: false,
})
</script>

<template>
  <div>
    <div v-if="status === 'authenticated'" class="flex">
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-avatar size="small" round :src="user?.image">
          <span v-if="!user?.image">{{ user?.name }}</span>
        </n-avatar>
      </n-dropdown>
    </div>
    <div v-else>
      <n-button size="small" type="primary" @click="showModal = true">
        登录
      </n-button>
      <ClientOnly>
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
          <LoginForm @success="handleSuccess" />
        </n-modal>
      </ClientOnly>
    </div>
  </div>
</template>

