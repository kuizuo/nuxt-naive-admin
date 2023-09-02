<script  setup lang="ts">
const supbabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const { t } = useI18n()

const showModal = ref(false)

const options = [
  {
    label: t('layout.header.home'),
    key: 'home',
    icon: renderIcon('ri:home-5-line'),
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: t('layout.header.profile'),
    key: 'profile',
    icon: renderIcon('ri:user-line'),
  },
  {
    label: t('layout.header.logout'),
    key: 'logout',
    icon: renderIcon('ri:logout-box-r-line'),
  },
]

async function handleSelect(key: string) {
  switch (key) {
    case 'home':
      router.push({ path: '/' })
      break
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
  <div v-if="user" class="flex justify-center items-center">
    <NDropdown trigger="hover" :options="options" @select="handleSelect">
      <NAvatar size="small" round :src="user?.user_metadata?.avatar_url">
        <span v-if="!user?.user_metadata?.avatar_url">{{ user?.user_metadata?.user_name ?? user.email }}</span>
      </NAvatar>
    </NDropdown>
  </div>
  <div v-else>
    <NButton size="small" type="primary" @click="showModal = true">
      登录
    </NButton>
    <ClientOnly>
      <NModal
        v-model:show="showModal" :mask-closable="true" size="large" :bordered="false"
        :closable="false" :style="{ 'max-width': '350px' }" transform-origin="center"
      >
        <LoginCard @success="handleSuccess" />
      </NModal>
    </ClientOnly>
  </div>
</template>
