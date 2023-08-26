<script lang="ts" setup>
const props = defineProps({
  showTitle: { type: Boolean, default: true },
})
const { title, logo } = useAppConfig()

const route = useRoute()

const isAdminPage = computed(() => route.path.includes('/admin'))
</script>

<template>
  <NuxtLink :to="isAdminPage ? '/admin/dashboard' : '/'" class="flex items-center justify-center gap-2">
    <Icon v-if="/\w+:\w+/.test(logo)" :name="logo" class="w-5 h-5" />
    <img v-else :src="logo" alt="logo" class="w-5 h-5">
    <h2 v-show="showTitle" class="ml-2 truncate md:opacity-100 font-sans leading-1em text-left text-base capitalize">
      {{ title }}
    </h2>
  </NuxtLink>
</template>
