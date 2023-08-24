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
      router.push({ path: '/account/profile' })
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
      <NDropdown trigger="hover" :options="options" @select="handleSelect">
        <NAvatar size="small" round :src="user?.user_metadata?.avatar_url">
          <span v-if="!user?.user_metadata?.avatar_url">{{ user?.user_metadata?.full_name ?? user.email }}</span>
        </NAvatar>
      </NDropdown>
    </div>
    <div v-else>
      <NButton size="small" type="primary" @click="showModal = true">
        登录
      </NButton>
      <ClientOnly>
        <NModal
          v-model:show="showModal" :mask-closable="true" preset="card" size="large" :bordered="false"
          :closable="false" :style="{ 'max-width': '350px' }" transform-origin="center"
        >
          <LoginCard @success="handleSuccess" />
        </NModal>
      </ClientOnly>
    </div>
  </div>
</template>
