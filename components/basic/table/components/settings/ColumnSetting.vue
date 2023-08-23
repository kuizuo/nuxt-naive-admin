<script lang="ts" setup>
import Sortablejs from 'sortablejs'
import type Sortable from 'sortablejs'

import { cloneDeep } from 'lodash'
import { useTableContext } from '../../hooks/useTableContext'
import type { BasicColumn } from '../../types/table'

interface State {
  checkAll: boolean
  isInit?: boolean
  checkedList: string[]
  defaultCheckList: string[]
}

interface Options {
  title: string
  key: string
  fixed?: undefined | 'left' | 'right'
}

const emits = defineEmits(['columns-change'])

const table = useTableContext()

const defaultRowSelection = ref(false)

const columnListRef = ref<(HTMLDivElement & { $el: any }) | null>(null)

const plainOptions = ref<Options[]>([])
const cachePlainOptions = ref<Options[]>([])
const sortPlainOptions = ref<Options[]>([])

const state = reactive<State>({
  checkAll: true,
  checkedList: [],
  defaultCheckList: [],
})

const indeterminate = computed(() => {
  return state.checkedList.length > 0 && state.checkedList.length < plainOptions.value.length
})

watchEffect(() => {
  setTimeout(() => {
    const columns = table.getColumns()
    if (columns.length)
      init()
  }, 0)
})

// 初始化
function init() {
  const columns = getColumns()
  const checkList = table
    .getColumns({ ignoreAction: true, ignoreIndex: true })
    .map((item) => {
      if (item.defaultHidden)
        return ''

      return item.key || item.title
    })
    .filter(Boolean) as string[]

  state.checkedList = checkList
  state.defaultCheckList = checkList

  if (!plainOptions.value.length) {
    plainOptions.value = columns
    cachePlainOptions.value = columns
    sortPlainOptions.value = columns
    state.defaultCheckList = checkList
  }
  else {
    unref(plainOptions).forEach((item: any) => {
      const findItem = columns.find((col: any) => col.key === item.key)
      if (findItem)
        item.fixed = findItem.fixed
    })
  }

  state.isInit = true
  state.checkedList = checkList
}

function onChange(list: string[]) {
  const len = sortPlainOptions.value.length
  state.checkAll = list.length === len
  const sortList = unref(sortPlainOptions).map(item => item.key)

  list.sort((prev, next) => {
    return sortList.indexOf(prev) - sortList.indexOf(next)
  })

  setColumns(list)
}

function setColumns(columns: BasicColumn[] | string[]) {
  table.setColumns(columns)
}

function getColumns() {
  const ret: Options[] = []
  table.getColumns({ ignoreIndex: true, ignoreAction: true }).forEach((item) => {
    ret.push({ ...item })
  })
  return ret
}

function onCheckAllChange(e: boolean) {
  const checkList = plainOptions.value.map(item => item.key)
  if (e) {
    state.checkedList = checkList
    setColumns(checkList)
  }
  else {
    state.checkedList = []
    setColumns([])
  }
}

function onSelection(e: boolean) {
  const checkList = table.getCacheColumns()
  if (e) {
    checkList.unshift({ type: 'selection', key: 'selection' })
    setColumns(checkList)
  }
  else {
    checkList.splice(0, 1)
    setColumns(checkList)
  }
}

function handleColumnFixed(item: BasicColumn, fixed?: 'left' | 'right') {
  if (!state.checkedList.includes(item.key))
    return

  const columns = getColumns() as unknown as BasicColumn[]
  const isFixed = item.fixed === fixed ? undefined : fixed
  const index = columns.findIndex(col => col.key === item.key)
  if (index !== -1)
    columns[index].fixed = isFixed

  if (isFixed && !item.width)
    item.width = 100

  table.setCacheColumnsByField?.(item.key, { fixed: isFixed })
  plainOptions.value[index].fixed = isFixed
  setColumns(columns)
}

let sortable: Sortable
let sortableOrder: string[] = []
function resetColumns() {
  state.checkedList = [...state.defaultCheckList]
  state.checkAll = true
  plainOptions.value = unref(cachePlainOptions)
  sortPlainOptions.value = unref(cachePlainOptions)

  setColumns(table.getCacheColumns())

  sortable.sort(sortableOrder)
}

let inited = false
function handleVisibleChange() {
  if (inited)
    return

  nextTick(() => {
    const columnListEl = unref(columnListRef)
    if (!columnListEl)
      return
    const el = columnListEl.$el as any
    if (!el)
      return

    sortable = Sortablejs.create(unref(el), {
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
      handle: '.table-column-drag-icon',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt
        if (!oldIndex || !newIndex || oldIndex === newIndex)
          return

        const columns = cloneDeep(sortPlainOptions.value)

        if (oldIndex > newIndex) {
          columns.splice(newIndex, 0, columns[oldIndex])
          columns.splice(oldIndex + 1, 1)
        }
        else {
          columns.splice(newIndex + 1, 0, columns[oldIndex])
          columns.splice(oldIndex, 1)
        }

        sortPlainOptions.value = columns

        const newColumns = columns
          .map((col: Options) => col.key)
          .filter((value: string) => state.checkedList.includes(value))

        setColumns(
          newColumns,
        )
      },
    })
    // 记录原始 order 序列
    sortableOrder = sortable.toArray()
    inited = true
  })
}
</script>

<template>
  <NTooltip trigger="hover">
    列设置
    <template #trigger>
      <div class="cursor-pointer">
        <NPopover trigger="click" :width="230" placement="bottom-end" @update:show="handleVisibleChange">
          <template #trigger>
            <Icon name="ant-design:setting-outlined" />
          </template>
          <template #header>
            <NSpace>
              <NCheckbox v-model:checked="state.checkAll" :indeterminate="indeterminate" @update:checked="onCheckAllChange">
                列展示
              </NCheckbox>
              <NCheckbox v-model:checked="defaultRowSelection" @update:checked="onSelection">
                勾选列
              </NCheckbox>
              <NButton text type="info" size="small" class="mt-1" @click="resetColumns">
                重置
              </NButton>
            </NSpace>
          </template>
          <div>
            <NCheckboxGroup ref="columnListRef" v-model:value="state.checkedList" @update:value="onChange">
              <template v-for="item in plainOptions" :key="item.key">
                <div class="flex items-center gap-2">
                  <Icon name="ant-design:drag-outlined" class="cursor-move table-column-drag-icon" />
                  <NCheckbox :value="item.key" :label="item.title" />
                  <div class="flex items-center justify-end flex-1">
                    <Icon
                      name="ant-design:vertical-right-outlined"
                      size="18"
                      class="cursor-pointer"
                      :class="item.fixed === 'left' ? 'text-blue-400' : ''"
                      @click="handleColumnFixed(item, 'left')"
                    />

                    <NDivider vertical />
                    <Icon
                      size="18"
                      name="ant-design:vertical-left-outlined"
                      class="cursor-pointer"
                      :class="item.fixed === 'right' ? 'text-blue-400' : ''"
                      @click="handleColumnFixed(item, 'right')"
                    />
                  </div>
                </div>
              </template>
            </NCheckboxGroup>
          </div>
        </NPopover>
      </div>
    </template>
  </NTooltip>
</template>
