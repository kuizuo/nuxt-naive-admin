<script setup lang="ts">
const { headerSetting } = useHeaderSetting()
const contentHeight = computed(() => {
  return headerSetting.value.showTabs ? 'calc(100vh - 50px - 37px)' : 'calc(100vh - 50px)'
})
</script>

<template>
  <n-layout class="flex flex-col max-h-screen" position="absolute" has-sider>
    <LayoutSider />

    <n-layout class="min-h-screen" :native-scrollbar="false">
      <n-layout-header>
        <LayoutHeader />
        <LayoutTabs v-if="headerSetting.showTabs" />
      </n-layout-header>
      <n-layout-content
        :style="{
          height: contentHeight,
        }"
        :content-style="{
          padding: '24px',
        }"
        :native-scrollbar="false"
      >
        <slot />
      </n-layout-content>

      <n-back-top :right="100" />
      <!-- <LayoutFooter /> -->
    </n-layout>
  </n-layout>
</template>

