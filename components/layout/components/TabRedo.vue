<script lang="ts" setup>
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
const tabStore = useTabStore()

const refreshing = computed(() => tabStore.refreshing)

async function handleRedo() {
  await tabStore.refreshPage()
}
</script>

<template>
  <span
    class="h-full flex items-center border-l"
    :style="{ borderColor: themeVars.borderColor }"
    @click="handleRedo"
  >
    <Icon
      name="ant-design:redo-outlined" class="w-8 inline-block cursor-pointer"
      :class="{ 'animate-spin': refreshing }"
    />
  </span>
</template>
