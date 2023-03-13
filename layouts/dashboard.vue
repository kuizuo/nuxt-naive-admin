<script setup lang="ts">
const collapsed = ref(false)
const isMobile = ref(false)

const mobileWidth = 950

// 判断是否触发移动端模式
const checkMobileMode = () => {
  if (document.body.clientWidth <= mobileWidth)
    isMobile.value = true

  else
    isMobile.value = false

  collapsed.value = false
}

const watchWidth = () => {
  const width = document.body.clientWidth
  if (width <= mobileWidth)
    collapsed.value = true

  else collapsed.value = false

  checkMobileMode()
}

onMounted(() => {
  checkMobileMode()
  window.addEventListener('resize', watchWidth)
})
</script>

<template>
  <n-layout class="flex flex-col min-h-screen">
    <n-layout-header bordered>
      <LayoutNavbar />
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        show-trigger
        :collapsed="collapsed"
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        style="min-height: calc(100vh - 50px);"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <LayoutSidebar v-model:collapsed="collapsed" />
      </n-layout-sider>
      <ClientOnly fallback-tag="span" fallback="Loading...">
        <n-layout-content style="max-height: calc(100vh - 50px);" content-style="padding: 24px;" :native-scrollbar="false">
          <slot />
        </n-layout-content>
      </ClientOnly>
    </n-layout>
    <!-- <n-layout-footer bordered>
        <LayoutFooter />
      </n-layout-footer> -->
  </n-layout>
</template>
