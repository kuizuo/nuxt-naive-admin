<script  setup lang="ts">
const supbabase = useSupabaseClient()
const user = useSupabaseUser()

const router = useRouter()

const showModal = ref(false)

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

async function handleSelect(key: string) {
  switch (key) {
    case 'profile':
      router.push({ name: 'profile' })
      break
    case 'logout':
      await supbabase.auth.signOut()
      router.push({ path: '/' })
      break
  }
}

function handleSuccess() {
  showModal.value = false
}
</script>

<template>
  <div>
    <div v-if="user" class="flex">
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-avatar size="small" round :src="user?.user_metadata?.avatar_url">
          <span v-if="!user?.user_metadata?.avatar_url">{{ user?.user_metadata?.full_name ?? user.email }}</span>
        </n-avatar>
      </n-dropdown>
    </div>
    <div v-else>
      <n-button size="small" type="primary" @click="showModal = true">
        登录
      </n-button>
      <ClientOnly>
        <n-modal
          v-model:show="showModal" :mask-closable="true" preset="card" size="large" :bordered="false"
          :closable="false" :style="{ 'max-width': '350px' }" transform-origin="center"
        >
          <LoginCard @success="handleSuccess" />
        </n-modal>
      </ClientOnly>
    </div>
  </div>
</template>
