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
  <NLayout class="flex flex-col max-h-screen" position="absolute" has-sider>
    <LayoutSider />

    <NLayout class="min-h-screen" :native-scrollbar="false">
      <NLayoutHeader ref="headerRef">
        <LayoutHeader />
        <LayoutTabs v-if="headerSetting.showTabs" />
      </NLayoutHeader>
      <NLayoutContent
        :style="{
          height: contentHeight,
        }" :native-scrollbar="false"
      >
        <slot v-if="!refreshing" />
      </NLayoutContent>

      <NBackTop :right="100" />
      <!-- <LayoutFooter /> -->
    </NLayout>
  </NLayout>
</template>
