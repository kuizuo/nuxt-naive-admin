<script setup lang="ts">
const headerRef = ref<any>(null)

const { headerSetting } = useHeaderSetting()

const headerHeight = ref(headerRef.value?.$el.offsetHeight || 0)
const contentHeight = computed(() => {
  return `calc(100vh - ${headerHeight}px)`
})

const refreshing = computed(() => useTabStore().refreshing)
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
        }" :native-scrollbar="false"
      >
        <slot v-if="!refreshing" />
      </n-layout-content>

      <n-back-top :right="100" />
      <!-- <LayoutFooter /> -->
    </n-layout>
  </n-layout>
</template>
