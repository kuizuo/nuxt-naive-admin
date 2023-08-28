<script lang="ts" setup>
export interface DynamicInfoItem {
  name: string
  avatar: string
  desc: string
  date: string
}

const props = defineProps<{
  data: DynamicInfoItem[]
}>()
</script>

<template>
  <NCard title="最新动态" size="small" :segmented="{ content: true }">
    <template #header-extra>
      <NButton type="primary" text tag="a" size="small">
        更多
      </NButton>
    </template>
    <NList item-layout="horizontal">
      <NListItem v-for="item of data" :key="item.name + item.desc">
        <template #prefix>
          <NAvatar circle :size="40" :src="item.avatar" />
        </template>
        <NThing>
          <template #header>
            <span class="text-sm">{{ item.name }} <span v-html="item.desc" /></span>
          </template>
          <template #description>
            <p class="text-xs text-gray-500">
              {{ item.date }}
            </p>
          </template>
        </NThing>
      </NListItem>
    </NList>
  </NCard>
</template>
