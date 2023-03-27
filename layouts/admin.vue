<script setup lang="ts">
const { headerSetting } = useHeaderSetting()

const headerRef = ref<any>(null)

const contentHeight = computed(() => {
  const headerHeight = headerRef.value?.$el.offsetHeight || 0
  return `calc(100vh - ${headerHeight}px)`
})
</script>

<template>
  <n-layout class="flex flex-col max-h-screen" position="absolute" has-sider>
    <LayoutSider />

    <n-layout class="min-h-screen" :native-scrollbar="false">
      <n-layout-header ref="headerRef">
        <LayoutHeader />
        <LayoutTabs v-if="headerSetting.showTabs" />
      </n-layout-header>
      <n-layout-content
        :style="{
          height: contentHeight,
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
