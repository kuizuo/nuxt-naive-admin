<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref(false)

function changeModal(show: boolean) {
  showModal.value = show
}
</script>

<template>
  <NTooltip class="flex justify-center items-center" placement="bottom" trigger="click">
    <template #trigger>
      <Icon name="ant-design:search-outlined" class="cursor" @click="changeModal(true)" />
    </template>
    <span>{{ '搜索' }}</span>
  </NTooltip>
  <ClientOnly>
    <Teleport to="body">
      <SearchModal :show="showModal" @close="changeModal(false)" />
    </Teleport>
  </ClientOnly>
</template>
