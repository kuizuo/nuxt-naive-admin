<script setup lang="ts">
const user = useSupabaseUser()
const { public: { adminUid } } = useRuntimeConfig()
</script>

<template>
  <nav class="flex gap-4 items-center text-left">
    <NuxtLink v-if="user?.id === adminUid" to="/admin/dashboard" class="w-full md:w-auto">
      <div class="py-1 px-2 rounded bg-green-600 text-white font-medium text-sm hover:bg-green-700">
        仪表盘
      </div>
    </NuxtLink>

    <NuxtLink to="/help" class="w-full md:w-auto">
      <div class="font-medium text-sm text-green-600">
        帮助说明
      </div>
    </NuxtLink>
  </nav>
</template>
