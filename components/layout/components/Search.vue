<script lang="ts" setup>
import SearchModal from './SearchModal.vue'

const showModal = ref(false)

function changeModal(show: boolean) {
  showModal.value = show
}
</script>

<template>
  <NTooltip class="flex justify-center items-center" placement="bottom" trigger="hover">
    <template #trigger>
      <Icon name="ant-design:search-outlined" class="cursor" @click="changeModal(true)" />
    </template>
    <span>{{ $t('layout.header.search') }}</span>
  </NTooltip>
  <ClientOnly>
    <Teleport to="body">
      <SearchModal :show="showModal" @close="changeModal(false)" />
    </Teleport>
  </ClientOnly>
</template>
