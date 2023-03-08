<script setup lang="ts">
const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>

<template>
  <n-avatar :size="100" :src="user!.avatar_url" />
  <h2 class="text-xl font-bold">
    <a v-if="user!.blog" :href="user!.blog" target="_blank" transition hover="text-green-5">{{ user!.name }}</a>
    <a v-else>{{ user!.name }}</a>
  </h2>
  <div flex justify-center items-center gap-4>
    <a
      flex flex-col cursor-pointer hover:text-green-6 transition
      :href="`https://github.com/${user!.login}?tab=followers`" target="_blank"
    >
      <p>{{ user!.followers }}</p>
      <p>粉丝</p>
    </a>
    <a
      flex flex-col cursor-pointer hover:text-green-6 transition
      :href="`https://github.com/${user!.login}?tab=following`" target="_blank"
    >
      <p>{{ user!.following }}</p>
      <p>关注</p>
    </a>
    <a
      flex flex-col cursor-pointer hover:text-green-6 transition
      :href="`https://github.com/${user!.login}?tab=repositories`" target="_blank"
    >
      <p>{{ user!.public_repos }}</p>
      <p>仓库</p>
    </a>
  </div>
</template>

<style scoped>

</style>
