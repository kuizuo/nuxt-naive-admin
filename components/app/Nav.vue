<template>
  <nav class="flex-auto flex justify-end gap-4 items-center">
    <NuxtLink to="/admin/dashboard">
      <div class="py-1 px-2 rounded bg-green-600 text-white font-medium text-sm hover:bg-green-700">
        仪表盘
      </div>
    </NuxtLink>
    <NuxtLink to="/changelog">
      <div class="font-medium text-sm  text-green-600">
        更新公告
      </div>
    </NuxtLink>
    <NuxtLink to="/help">
      <div class="font-medium text-sm  text-green-600">
        帮助说明
      </div>
    </NuxtLink>
  </nav>
</template>
