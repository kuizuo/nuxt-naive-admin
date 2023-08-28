<script lang="ts" setup>
export interface GroupItem {
  title: string
  icon: string
  color: string
  desc: string
  group: string
  date: string
}

const props = defineProps<{ data: GroupItem[] }>()
</script>

<template>
  <NCard
    title="项目" size="small"
    content-style="padding:0"
  >
    <template #header-extra>
      <NButton type="primary" text tag="a" size="small">
        更多
      </NButton>
    </template>

    <div class="grid grid-cols-2 lg:grid-cols-3">
      <NCard v-for="item in data" :key="item.title" class="rounded-none box-content -m-[1px]" hoverable>
        <span class="flex">
          <Icon :name="item.icon" :color="item.color" size="30" />
          <span class="text-lg ml-4">{{ item.title }}</span>
        </span>
        <div class="flex mt-2 h-10 text-secondary">
          {{ item.desc }}
        </div>
        <div class="flex justify-between text-secondary">
          <span>{{ item.group }}</span>
          <span>{{ item.date }}</span>
        </div>
      </NCard>
    </div>
  </NCard>
</template>

<style lang="scss" scoped>
.n-card.n-card--hoverable:hover {
  z-index: 100;
}
</style>
