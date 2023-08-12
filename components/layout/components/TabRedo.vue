<script lang="ts" setup>
const tabStore = useTabStore()

const refreshing = computed(() => tabStore.refreshing)

async function handleRedo() {
  await tabStore.refreshPage()
}
</script>

<template>
  <span class="h-full flex items-center border-l-1 border-[var(--n-border-color)]" @click="handleRedo">
    <Icon
      name="ant-design:redo-outlined" class="w-8 inline-block cursor-pointer"
      :class="{ 'animate-spin': refreshing }"
    />
  </span>
</template>
