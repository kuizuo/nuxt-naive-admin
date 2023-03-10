<script setup lang="ts">
import { Icon } from '#components'
const { status, data, signOut, signIn } = useSession()

const router = useRouter()

const user = computed(() => data.value?.user)

function renderIcon(icon: string) {
  return () => h(Icon, { name: icon })
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

const handleSelect = (key: string) => {
  switch (key) {
    case 'profile':
      router.push({ name: 'me' })
      break
    case 'logout':
      signOut()
      break
  }
}
</script>

<template>
  <div v-if="status === 'authenticated'">
    <n-dropdown trigger="hover" placement="bottom-center" :options="options" @select="handleSelect">
      <n-avatar round :src="user?.image">
        <span v-if="!user?.image">{{ user?.name }}</span>
      </n-avatar>
    </n-dropdown>
  </div>
  <NuxtLink v-else size="small" type="primary" to="/login">
    <n-button size="small" type="primary">
      登录
    </n-button>
  </NuxtLink>
</template>

