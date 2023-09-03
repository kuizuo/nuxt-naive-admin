<script setup lang="ts">
import { useThemeVars } from 'naive-ui'

const colorMode = useColorMode()

const { menuWidth, collapsed, toggleCollapsed, menuType, setMenuSetting } = useMenuSetting()
const { isMobile } = useDevice()
const { showLogo } = useAppSetting()

const isDark = computed(() => colorMode.value === 'dark')

const showSideDrawder = computed({
  get: () => isMobile.value && !collapsed.value,
  set: (val: any) => {
    setMenuSetting({ collapsed: !val })
  },
})

const themeVars = useThemeVars()

const style = computed(() => {
  return {
    backgroundColor: isDark.value
      ? unref(themeVars).bodyColor
      : (menuType.value === 'dark' ? '#293350' : unref(themeVars).baseColor),
  }
})
</script>

<template>
  <NLayoutSider
    v-if="!isMobile"
    bordered show-trigger="bar"
    collapse-mode="width"
    :collapsed="collapsed"
    :collapsed-width="64" :width="menuWidth"
    :native-scrollbar="false"
    class="min-h-screen relative z-20 transition-all duration-200 ease-in-out shadow-md"
    :style="style"
    @collapse="toggleCollapsed"
    @expand="toggleCollapsed"
  >
    <AppLogo
      :show-logo="showLogo"
      :show-title="!(collapsed || isMobile)"
      class="flex h-12"
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
