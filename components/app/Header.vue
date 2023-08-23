<script setup lang="ts">
const show = ref(false)
</script>

<template>
  <div class="px-6 py-2 border-b border-gray-400/10 flex gap-4 items-center">
    <AppLogo />

    <div class="flex-1" />

    <AppNav class="hidden md:inline-flex " />

    <div class="hidden md:inline-flex items-center gap-4">
      <div class="md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
      <AppThemeSwitcher />
      <UserButton />
    </div>

    <div class="inline-flex md:hidden items-center gap-4">
      <AppThemeSwitcher />
      <UserButton />
      <Icon name="ant-design:menu-outlined" @click="show = true" />
    </div>
    <NDrawer v-model:show="show" :width="240">
      <NDrawerContent closable>
        <template #header>
          <AppLogo :show-title="false" />
        </template>
        <AppNav class="flex-col w-full" />
      </NDrawerContent>
    </NDrawer>
  </div>
</template>
