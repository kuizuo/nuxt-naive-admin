<template>
  <nav class="px-6 py-2 border-b border-gray-400/10 flex gap-2 items-center">
    <AppLogo />
    <div class="flex-auto" />

    <div class="flex gap-4 items-center">
      <NuxtLink to="/admin/dashboard">
        <div class="py-1 px-2 rounded bg-green-600 text-white font-medium text-sm hover:bg-green-700">
          仪表盘
        </div>
      </NuxtLink>
      <NuxtLink to="/changelog">
        <div class="font-medium text-sm hover:opacity-100 text-green-600">
          更新公告
        </div>
      </NuxtLink>
      <NuxtLink to="/help">
        <div class="font-medium text-sm hover:opacity-100 text-green-600">
          帮助说明
        </div>
      </NuxtLink>

      <AppDarkToggle />
      <UserDropdown />
    </div>
  </nav>
</template>
