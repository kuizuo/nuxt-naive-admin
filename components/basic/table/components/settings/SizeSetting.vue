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
  <NTooltip trigger="hover">
    <template #trigger>
      <div>
        <NDropdown
          v-model:value="tableSize"
          trigger="click"
          :options="options"
          @select="onSelect"
        >
          <Icon name="ant-design:column-height-outlined" class="cursor-pointer" />
        </NDropdown>
      </div>
    </template>
    <span>密度</span>
  </NTooltip>
</template>
