<script lang="ts" setup>
export interface NavItem {
  title: string
  icon: string
  color: string
}

const props = defineProps<{ data: NavItem[] }>()
</script>

<template>
  <NCard
    title="快捷导航" size="small"
    content-style="padding:0"
  >
    <div class="grid grid-cols-2 lg:grid-cols-3">
      <NCard v-for="item in data" :key="item.title" class="rounded-none box-content -m-[1px]" hoverable>
        <span class="flex flex-col items-center">
          <Icon :name="item.icon" :color="item.color" size="20" />
          <span class="text-md mt-2 truncate">{{ item.title }}</span>
        </span>
      </NCard>
    </div>
  </NCard>
</template>

<style lang="scss" scoped>
.n-card.n-card--hoverable:hover {
    z-index: 100;
}
</style>
