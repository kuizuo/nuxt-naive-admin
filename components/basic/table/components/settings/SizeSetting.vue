<script lang="ts" setup>
import { useTableContext } from '../../hooks/useTableContext'

type SizeType = 'small' | 'medium' | 'large'

const table = useTableContext()
const tableSize = ref<SizeType>('medium')

const options = [
  {
    label: '紧凑',
    key: 'small',
  },
  {
    label: '默认',
    key: 'medium',
  },
  {
    label: '宽松',
    key: 'large',
  },
]

function onSelect(e: SizeType) {
  tableSize.value = e
  table.setProps({ size: e })
}
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <div class="table-toolbar-right-icon">
        <n-dropdown
          v-model:value="tableSize"
          trigger="click"
          :options="options"
          @select="onSelect"
        >
          <Icon name="ant-design:column-height-outlined" cursor-pointer />
        </n-dropdown>
      </div>
    </template>
    <span>密度</span>
  </n-tooltip>
</template>
