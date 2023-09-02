<script setup lang="ts">
const { showTabs } = useHeaderSetting()

const refreshing = computed(() => useTabStore().refreshing)

const contentHight = computed(() => {
  const tabsHeight = showTabs.value ? 'var(--app-tabs-height)' : '0px'

  return `calc(100vh - var(--app-header-height)) - ${tabsHeight}`
})

const contentTop = computed(() => {
  const tabsHeight = showTabs.value ? 'var(--app-tabs-height)' : '0px'

  return `calc(var(--app-header-height) + ${tabsHeight})`
})
</script>

<template>
  <NLayout class="flex flex-col max-h-screen" position="absolute" has-sider>
    <LayoutSider />

    <NLayout class="min-h-screen" :native-scrollbar="false">
      <NLayoutHeader>
        <LayoutHeader />
        <LayoutTabs v-if="showTabs" />
      </NLayoutHeader>
      <NLayoutContent
        embedded
        position="absolute"
        :style="{ top: contentTop }"
        :content-style="{
          height: contentHight,
        }"
        :native-scrollbar="false"
      >
        <slot
          v-if="!refreshing"
        />
      </NLayoutContent>

      <!-- <LayoutFooter /> -->

      <!-- <NBackTop :right="100" /> -->
    </NLayout>
  </NLayout>
</template>
