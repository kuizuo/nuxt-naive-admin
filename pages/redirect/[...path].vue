<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  pageTransition: false,
  layoutTransition: false,
  name: 'Redirect',
  title: 'Redirect',
  order: 1,
  icon: 'ant-design:dashboard-outlined',
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
