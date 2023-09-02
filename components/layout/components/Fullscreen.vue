<script lang="ts" setup>
const { toggle, isFullscreen } = useFullscreen()
const { t } = useI18n()

const title = computed(() => {
  return isFullscreen.value ? t('layout.header.tooltip_exit_full') : t('layout.header.tooltip_entry_full')
})
</script>

<template>
  <NTooltip class="flex justify-center items-center" placement="bottom" trigger="hover">
    <template #trigger>
      <span class="flex cursor-pointer" @click="toggle()">
        <Icon v-if="!isFullscreen" name="ant-design:fullscreen-outlined" />
        <Icon v-else name="ant-design:fullscreen-outlined" />
      </span>
    </template>
    <span>{{ title }}</span>
  </NTooltip>
</template>
