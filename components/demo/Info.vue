<script setup lang="ts">
defineProps<{
  user: API.Github.User
}>()
</script>

<template>
  <n-avatar :size="100" :src="user!.avatar_url" />
  <h2 class="text-xl font-bold">
    <a v-if="user!.blog" :href="user!.blog" target="_blank" class="transition hover:text-green-500">{{ user!.name }}</a>
    <a v-else>{{ user!.name }}</a>
  </h2>
  <div class="flex justify-center items-center gap-4">
    <a
      class="flex flex-col cursor-pointer hover:text-green-600 transition"
      :href="`https://github.com/${user!.login}?tab=followers`" target="_blank"
    >
      <p>{{ user!.followers }}</p>
      <p>粉丝</p>
    </a>
    <a
      class="flex flex-col cursor-pointer hover:text-green-600 transition"
      :href="`https://github.com/${user!.login}?tab=following`" target="_blank"
    >
      <p>{{ user!.following }}</p>
      <p>关注</p>
    </a>
    <a
      class="flex flex-col cursor-pointer hover:text-green-600 transition"
      :href="`https://github.com/${user!.login}?tab=repositories`" target="_blank"
    >
      <p>{{ user!.public_repos }}</p>
      <p>仓库</p>
    </a>
  </div>
</template>
