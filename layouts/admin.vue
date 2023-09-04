<script setup lang="ts">
const { showFooter } = useAppSetting()
const { showTabs } = useHeaderSetting()

const refreshing = computed(() => useTabStore().refreshing)

const contentHight = computed(() => {
  const tabsHeight = showTabs.value ? 'var(--app-tabs-height)' : '0px'
  const footerHeight = showFooter.value ? 'var(--app-footer-height)' : '0px'

  return `calc(100vh - var(--app-header-height)) - ${footerHeight} - ${tabsHeight}`
})

const top = computed(() => {
  const tabsHeight = showTabs.value ? 'var(--app-tabs-height)' : '0px'

  return `calc(var(--app-header-height) + ${tabsHeight})`
})

const bottom = computed(() => {
  if (showFooter.value)
    return 'var(--app-footer-height)'

  return 0
})
</script>

<template>
  <NLayout class="flex flex-col max-h-screen" position="absolute" has-sider>
    <LayoutSider />

    <NLayout class="min-h-screen" :native-scrollbar="false">
      <NLayoutHeader position="absolute">
        <LayoutHeader />
        <LayoutTabs v-if="showTabs" />
      </NLayoutHeader>
      <NLayoutContent
        embedded
        position="absolute"
        :style="{ top, bottom }"
        :content-style="{
          height: contentHight,
        }"
        :native-scrollbar="false"
      >
        <ClientOnly>
          <slot v-if="!refreshing" />
          <n-spin v-else :show="refreshing" class="absolute translate-x-1/2 top-1/2 translate-y-1/2 left-1/2" />

          <template #fallback>
            <n-spin :show="refreshing" class="absolute translate-x-1/2 top-1/2 translate-y-1/2 left-1/2" />
          </template>
        </ClientOnly>
      </NLayoutContent>

      <NLayoutFooter v-if="showFooter" position="absolute">
        <LayoutFooter />
      </NLayoutFooter>

      <!-- <NBackTop :right="100" /> -->
    </NLayout>
  </NLayout>
</template>
