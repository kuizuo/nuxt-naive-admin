<script setup lang="ts">
const { title } = useAppConfig()
</script>

<template>
  <nav px-8 py-4 border="b gray-400/10" flex="~ gap-2 " items-center>
    <NuxtLink to="/" flex="~ gap-2" items-center>
      <i i-carbon-api />
      <div font-sans leading-1em text-left text-sm capitalize>
        {{ title }}
      </div>
    </NuxtLink>

    <div flex="auto" />

    <div flex="~ gap-4" items-center>
      <NuxtLink to="/changelog">
        <div font-medium text-sm hover="opacity-100 text-green-600">
          更新公告
        </div>
      </NuxtLink>
      <NuxtLink to="/help">
        <div font-medium text-sm hover="opacity-100 text-green-600">
          帮助说明
        </div>
      </NuxtLink>

      <DarkToggle />
      <UserDropdown />
    </div>
  </nav>
</template>
