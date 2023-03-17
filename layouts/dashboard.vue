<script setup lang="ts">
// const mobileWidth = 950

// // 判断是否触发移动端模式
// const checkMobileMode = () => {
//   if (document.body.clientWidth <= mobileWidth)
//     isMobile.value = true

//   else
//     isMobile.value = false

// }

// const watchWidth = () => {
//   const width = document.body.clientWidth
//   if (width <= mobileWidth)
//     collapsed.value = true

//   else collapsed.value = false

//   checkMobileMode()
// }

// onMounted(() => {
//   checkMobileMode()
//   window.addEventListener('resize', watchWidth)
// })
</script>

<template>
  <n-layout class="flex flex-col min-h-screen" has-sider>
    <LayoutSider />

    <n-layout :has-sider="false">
      <n-layout-header bordered>
        <LayoutHeader />
      </n-layout-header>
      <n-layout-content style="max-height: calc(100vh - 50px);" content-style="padding: 24px;" :native-scrollbar="false">
        <!-- <ClientOnly fallback-tag="span" fallback="Loading..."> -->
        <!-- <MultiTabs v-if="isMultiTabs" v-model:collapsed="collapsed" /> -->

        <slot />
        <!-- </ClientOnly> -->
      </n-layout-content>

      <n-back-top :right="100" />
      <!-- <LayoutFooter /> -->
    </n-layout>
  </n-layout>
</template>
