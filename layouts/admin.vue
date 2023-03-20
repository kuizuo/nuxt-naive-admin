<script setup lang="ts">
const { headerSetting } = useHeaderSetting()
</script>

<template>
  <n-layout class="flex flex-col min-h-screen" has-sider>
    <LayoutSider />

    <n-layout :has-sider="false">
      <n-layout-header>
        <LayoutHeader />
        <LayoutTabs v-if="headerSetting.showTabs" />
      </n-layout-header>
      <n-layout-content style="max-height: calc(100vh - 50px);" content-style="padding: 24px;" :native-scrollbar="false">
        <ClientOnly fallback-tag="span" fallback="Loading...">
          <slot />
        </ClientOnly>
      </n-layout-content>

      <n-back-top :right="100" />
      <!-- <LayoutFooter /> -->
    </n-layout>
  </n-layout>
</template>
