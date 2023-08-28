<script setup lang="ts">
const headerRef = ref<any>(null)

const { showTabs } = useHeaderSetting()

const headerHeight = ref(headerRef.value?.$el.offsetHeight || 0)

const isDark = computed(() => useColorMode().value === 'dark')
const refreshing = computed(() => useTabStore().refreshing)

onMounted(() => {
  nextTick(() => {
    headerHeight.value = headerRef.value?.$el.offsetHeight || 0
  })
})
</script>

<template>
  <NLayout class="flex flex-col max-h-screen" position="absolute" has-sider>
    <LayoutSider />

    <NLayout class="min-h-screen" :native-scrollbar="false">
      <NLayoutHeader ref="headerRef">
        <LayoutHeader />
        <LayoutTabs v-if="showTabs" />
      </NLayoutHeader>
      <ClientOnly>
        <NLayoutContent
          :style="{
            backgroundColor: isDark ? '#141414' : '#f9fafb',
            height: `calc(100vh - ${headerHeight}px)`,
          }"
          :content-style="{
            height: `calc(100vh - ${headerHeight}px - ${16}px)`,
          }"
          :native-scrollbar="false"
        >
          <slot
            v-if="!refreshing"
          />
        </NLayoutContent>
      </ClientOnly>

      <!-- <LayoutFooter /> -->

      <!-- <NBackTop :right="100" /> -->
    </NLayout>
  </NLayout>
</template>
