<script lang="ts" setup>
const { toggle, isFullscreen } = useFullscreen()

const title = computed(() => {
  return isFullscreen.value ? '退出全屏' : '全屏'
})
</script>

<template>
  <NTooltip class="flex justify-center items-center" placement="bottom" trigger="click">
    <template #trigger>
      <span class="flex cursor-pointer" @click="toggle">
        <Icon v-if="!isFullscreen" name="ant-design:fullscreen-outlined" />
        <Icon v-else name="ant-design:fullscreen-outlined" />
      </span>
    </template>
    <span>{{ title }}</span>
  </NTooltip>
</template>
