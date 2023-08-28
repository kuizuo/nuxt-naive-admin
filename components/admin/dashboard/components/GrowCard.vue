<script lang="ts" setup>
import type { GrowCardItem } from '~/server/api/dashboard/console'

const props = defineProps({
  loading: {
    type: Boolean,
  },
  data: {
    type: Array<GrowCardItem>,
  },
})
</script>

<template>
  <div>
    <NGrid x-gap="12" y-gap="12" cols="1 s:2 l:4 xl:4 2xl:4" item-responsive responsive="screen">
      <template v-if="loading">
        <NGi v-for="(item, index) in [1, 2, 3, 4]" :key="index">
          <NCard
            size="small"
            :segmented="{ content: true, footer: true }"
            :header-style="{
              padding: '8px 16px',
              fontSize: '14px',
            }"
          >
            <template #header>
              <n-skeleton text width="60%" />
            </template>

            <template #header-extra>
              <n-skeleton text width="20%" />
            </template>

            <div class="py-1 text-2xl">
              <n-skeleton text width="100%" />
            </div>

            <template #footer>
              <n-skeleton text width="100%" />
            </template>
          </NCard>
        </NGi>
      </template>
      <template v-else>
        <NGi v-for="item in data" :key="item.title">
          <NCard
            size="small"
            :segmented="{ content: true, footer: true }"
            :header-style="{
              padding: '8px 16px',
              fontSize: '14px',
            }"
          >
            <template #header>
              <n-skeleton v-if="loading" text width="60%" />
              <template v-else>
                <span> {{ item.title }}</span>
              </template>
            </template>

            <template v-if="item.action" #header-extra>
              <NTag :type="item.type">
                {{ item.action }}
              </NTag>
            </template>

            <div class="py-1 text-2xl">
              <n-skeleton v-if="loading" text width="100%" />
              <NNumberAnimation v-else show-separator :from="0" :to="item.value" />
            </div>

            <template #footer>
              <n-skeleton v-if="loading" text width="100%" />

              <div v-else class="flex gap-4">
                <span>总{{ item.title }}</span>
                <NNumberAnimation show-separator :from="0" :to="item.total" />
              </div>
            </template>
          </NCard>
        </NGi>
      </template>
    </NGrid>
  </div>
</template>
