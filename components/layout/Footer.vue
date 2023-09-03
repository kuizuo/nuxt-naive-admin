<script lang="ts" setup>
import { useThemeVars } from 'naive-ui'
import pkg from '~/package.json'

const { title } = useAppConfig()
const themeVars = useThemeVars()

const { version } = pkg
</script>

<template>
  <footer class="border-t h-[--app-footer-height]" :style="{ borderColor: themeVars.borderColor }">
    <div class="flex items-center h-full gap-2 py-4 justify-center sm:gap-4">
      <span class="text-sm">
        {{ title }} - v{{ version }}
      </span>
      <div class="flex items-center gap-2 md:gap-4">
        <NuxtLink class="i-ri-github-line icon-btn" :to="pkg.repository.url" target="_blank" />
      </div>
    </div>
  </footer>
</template>
