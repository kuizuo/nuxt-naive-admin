<script setup lang="ts">
import { basicProps } from './props'
import type { BasicTableProps, TableActionType } from './types/table'

import { createTableContext } from './hooks/useTableContext'
import { useDataSource } from './hooks/useDataSource'
import { useColumns } from './hooks/useColumns'
import { usePagination } from './hooks/usePagination'
import { useLoading } from './hooks/useLoading'

import RedoSetting from './components/settings/RedoSetting.vue'
import SizeSetting from './components/settings/SizeSetting.vue'
import ColumnSetting from './components/settings/ColumnSetting.vue'

const props = defineProps(basicProps)
const emits = defineEmits([
  'fetch-success',
  'fetch-error',
])
const attrs = useAttrs()

const wrapRef = ref(null)
const tableElRef = ref(null)
const tableData = ref<Record<string, any>[]>([])
const innerPropsRef = ref<Partial<BasicTableProps>>()

const getProps = computed(() => {
  return { ...props, ...unref(innerPropsRef) } as BasicTableProps
})

const { getLoading, setLoading } = useLoading(getProps)

const { getPaginationInfo, setPagination } = usePagination(getProps)

const { getDataSourceRef, getDataSource, getRowKey, reload } = useDataSource(
  getProps,
  {
    getPaginationInfo,
    setPagination,
    setLoading,
    tableData,
  },
  emits,
)

function setProps(props: Partial<BasicTableProps>) {
  innerPropsRef.value = { ...unref(innerPropsRef), ...props }
}

const { getViewColumns, setColumns, getColumns, getCacheColumns, setCacheColumnsByField }
        = useColumns(getProps, getPaginationInfo)

const getBindValues = computed(() => {
  const dataSource = unref(getDataSourceRef)

  const propsData: any = {
    ...attrs,
    ...unref(getProps),
    // ...unref(getHeaderProps),
    'loading': unref(getLoading),
    'tableLayout': 'fixed',
    'rowKey': unref(getRowKey),
    'columns': toRaw(unref(getViewColumns)),
    'pagination': toRaw(unref(getPaginationInfo)),
    'data': dataSource,
    'remote': !!unref(getProps).request,
    // footer: unref(getFooterProps),
    'on-update:page': (page: number) => {
      setPagination({ page })
      reload()
    },
    'on-update:page-size': (pageSize: number) => {
      setPagination({ pageSize })
      reload()
    },
  }

  return propsData
})

const tableAction: TableActionType | any = {
  reload,
  setColumns,
  setLoading,
  setProps,
  getColumns,
  getCacheColumns,
  setCacheColumnsByField,
  getDataSource,
}

createTableContext({ ...tableAction, wrapRef, getBindValues })

defineExpose(tableAction)
</script>

<template>
  <div ref="wrapRef">
    <div class="flex items-center min-h-[36px] mb-2">
      <div class="flex items-center">
        <template v-if="title">
          <div class="text-base">
            {{ title }}
          </div>
        </template>
        <slot name="tableTitle" />
      </div>

      <div class="flex justify-end items-center flex-1">
        <slot name="toolbar" />

        <NDivider vertical />
        <div class="flex justify-center items-center gap-2">
          <!-- 刷新 -->
          <RedoSetting />
          <!-- 密度 -->
          <SizeSetting />
          <!-- 列设置 -->
          <ColumnSetting />
        </div>
      </div>
    </div>
    <NDataTable
      ref="tableElRef"
      v-bind="getBindValues"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
        <slot :name="item" v-bind="data" />
      </template>
    </NDataTable>
  </div>
</template>
