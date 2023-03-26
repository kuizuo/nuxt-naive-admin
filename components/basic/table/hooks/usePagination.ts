import type { ComputedRef } from 'vue'
import { computed, ref, unref, watch } from 'vue'
import { isBoolean } from 'lodash-es'
import type { PaginationProps } from '../types/pagination'
import type { BasicTableProps } from '../types/table'
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const'

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({})
  const show = ref(true)

  watch(
    () => unref(refProps).pagination,
    (pagination) => {
      if (!isBoolean(pagination) && pagination) {
        configRef.value = {
          ...unref(configRef),
          ...(pagination ?? {}),
        }
      }
    },
  )

  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps)

    if (!unref(show) || (isBoolean(pagination) && !pagination))
      return false

    return {
      // size: 'small',
      page: 1,
      pageSize: PAGE_SIZE,
      pageSizes: PAGE_SIZE_OPTIONS,
      showQuickJumper: true,
      showSizePicker: true,
      prefix: ({ itemCount }) => {
        return `共 ${itemCount} 条数据`
      },
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
    }
  })

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo)

    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    }
  }

  function getPagination() {
    return unref(getPaginationInfo)
  }

  function getShowPagination() {
    return unref(show)
  }

  async function setShowPagination(flag: boolean) {
    show.value = flag
  }

  return { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination }
}
