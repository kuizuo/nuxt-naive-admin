<script lang="ts" setup>
const loading = ref(false)

const { refreshPage } = useTabStore()

async function handleRedo() {
  loading.value = true
  await refreshPage()
  setTimeout(() => {
    loading.value = false
  }, 1200)
}
</script>

<template>
  <span class="h-full flex items-center border-l-1 border-[var(--n-border-color)]" @click="handleRedo">
    <Icon
      name="ant-design:redo-outlined"
      class="w-8 inline-block cursor-pointer"
      :class="{ 'animate-spin': loading }"
    />
  </span>
</template>
