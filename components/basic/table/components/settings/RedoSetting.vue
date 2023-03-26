<script lang="ts" setup>
import { useTableContext } from '../../hooks/useTableContext'

const table = useTableContext()

function redo() {
  table.reload()
}
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <Icon name="ant-design:redo-outlined" cursor-pointer @click="redo" />
    </template>
    刷新
  </n-tooltip>
</template>
