<script setup lang="ts">
import type { User } from '~~/types'

const { user } = defineProps<{
  user: User
}>()
</script>

<template>
  <n-avatar :size="100" :src="user!.avatar_url" />
  <div flex justify-center items-center gap-4>
    <a
      flex flex-col cursor-pointer hover:text-blue-3 transition
      :href="`https://github.com/${user!.login}?tab=followers`" target="_blank"
    >
      <p>{{ user!.followers }}</p>
      <p>粉丝</p>
    </a>
    <a
      flex flex-col cursor-pointer hover:text-blue-3 transition
      :href="`https://github.com/${user!.login}?tab=following`" target="_blank"
    >
      <p>{{ user!.following }}</p>
      <p>关注</p>
    </a>
    <a
      flex flex-col cursor-pointer hover:text-blue-3 transition
      :href="`https://github.com/${user!.login}?tab=repositories`" target="_blank"
    >
      <p>{{ user!.public_repos }}</p>
      <p>仓库</p>
    </a>
  </div>
</template>

<style scoped>
</style>
