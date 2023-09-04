<script lang="ts" setup>
import { useTableContext } from '../../hooks/useTableContext'

const table = useTableContext()

function redo() {
  table.reload()
}
</script>

<template>
  <NTooltip trigger="hover">
    <template #trigger>
      <Icon name="ant-design:redo-outlined" class="cursor-pointer" @click="redo" />
    </template>
    刷新
  </NTooltip>
</template>
