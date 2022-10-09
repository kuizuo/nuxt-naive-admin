<script setup lang="ts">
import pkg from '~/package.json'
</script>

<template>
  <footer class="border bg-white border-gray-100 dark:(bg-#121213 border-#242427)">
    <div class="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="flex flex-col items-center h-full gap-4 py-4 sm:flex-row sm:justify-between sm:gap-x-16">
        <div class="inline-flex gap-4">
          <a :href="pkg.author.url" target="_blank" class="flex items-center gap-1 text-gray-700 hover:text-gray-900 dark:(text-gray-200 hover:text-gray-100) ">
            <i i-ri:user-star-line />
            <p class="text-xs font-semibold self-end">作者: {{ pkg.author.name }}</p>
          </a>
          <a :href="pkg.author.url" target="_blank" class="flex items-center gap-1 text-gray-700 hover:text-gray-900 dark:(text-gray-200 hover:text-gray-100) ">
            <i i-ri:file-code-line />
            <p class="text-xs font-semibold self-end">版本: {{ pkg.version }}</p>
          </a>
        </div>
        <div class="flex items-center gap-3">
          <a i-ri-qq-line :href="pkg.author.qq" />
          <a i-ri-wechat-2-line :href="pkg.author.wx" />
          <a i-ri-github-line :href="pkg.repository.url" target="_blank" />
        </div>
      </div>
    </div>
  </footer>
</template>
