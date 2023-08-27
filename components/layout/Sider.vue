<script setup lang="ts">
const { menuWidth, collapsed, toggleCollapsed, menuType, setMenuSetting } = useMenuSetting()
const { isMobile } = useDevice()

const showSideDrawder = computed({
  get: () => isMobile.value && !collapsed.value,
  set: (val: any) => {
    setMenuSetting({ collapsed: !val })
  },
})
</script>

<template>
  <NLayoutSider
    v-if="!isMobile" bordered show-trigger="bar" :collapsed="collapsed" collapse-mode="width"
    :collapsed-width="64" :width="menuWidth" :native-scrollbar="false"
    class="min-h-screen relative z-20 transition-all duration-200 ease-in-out shadow-md dark:bg-[--n-color]"
    :class="{ 'bg-[#293350]': menuType === 'dark' }"
    @collapse="toggleCollapsed"
    @expand="toggleCollapsed"
  >
    <AppLogo
      :show-title="!(collapsed || isMobile)" class="flex h-12 "
      :class="{ 'text-white': menuType === 'dark' }"
    />
    <LayoutMenu />
  </NLayoutSider>
  <NDrawer
    v-else v-model:show="showSideDrawder" :width="menuWidth" placement="left"
    class="min-h-screen relative z-20 transition-all duration-200 ease-in-out "
  >
    <AppLogo class="flex h-12" />
    <LayoutMenu @clickMenuItem="toggleCollapsed" />
  </NDrawer>
</template>
