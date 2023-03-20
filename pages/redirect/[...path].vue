<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  pageTransition: false,
  layoutTransition: false,
  title: 'Redirect',
  hideMenu: true,
})

const route = useRoute()

onBeforeMount(() => {
  const { params, query } = route
  const { path } = params

  const newPath = `/${Array.isArray(path) ? path.join('/') : path}`
  navigateTo(newPath)
})
</script>

<template>
  <div />
</template>
