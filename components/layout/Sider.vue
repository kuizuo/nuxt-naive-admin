<script setup lang="ts">
const { menuWidth, collapsed, toggleCollapsed, setMenuSetting } = useMenuSetting()
const { isMobile } = useDevice()

const showSideDrawder = computed({
  get: () => isMobile.value && !collapsed.value,
  set: (val: any) => {
    setMenuSetting({ collapsed: !val })
  },
})
</script>

<template>
  <n-layout-sider v-if="!isMobile" bordered show-trigger="bar" :collapsed="collapsed" collapse-mode="width"
    :collapsed-width="64" :width="menuWidth" :native-scrollbar="false"
    class="min-h-screen relative z-20 transition-all duration-200 ease-in-out" @collapse="toggleCollapsed"
    @expand="toggleCollapsed">
    <AppLogo :show-title="!(collapsed || isMobile)" class="flex h-12" />
    <LayoutMenu />
  </n-layout-sider>
  <n-drawer v-else v-model:show="showSideDrawder" :width="menuWidth" placement="left"
    class="min-h-screen relative z-20 transition-all duration-200 ease-in-out">
    <AppLogo class="flex h-12" />
    <LayoutMenu @clickMenuItem="toggleCollapsed" />
  </n-drawer>
</template>

<style lang="scss" scoped></style>
