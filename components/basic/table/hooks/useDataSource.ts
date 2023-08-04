import type { ComputedRef } from 'vue'
import { computed, onMounted, ref, unref, watch, watchEffect } from 'vue'
import { get, isBoolean, isFunction, merge } from 'lodash-es'
import type { BasicTableProps, FetchParams } from '../types/table'
import type { PaginationProps } from '../types/pagination'
import { FETCH_SETTING, PAGE_SIZE } from '../const'

interface ActionType {
  getPaginationInfo: ComputedRef<boolean | PaginationProps>
  setPagination: (info: Partial<PaginationProps>) => void
  setLoading: (loading: boolean) => void
  getFieldsValue?: () => Record<string, any>
  tableData: Ref<Record<string, any>[]>
}

interface SearchState {
  sortInfo: Record<string, any>
  filterInfo: Record<string, string[]>
}

export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  { getPaginationInfo, setPagination, setLoading, getFieldsValue, tableData }: ActionType,
  emits: (event: any, ...args: any[]) => void,
) {
  const searchState = reactive<SearchState>({
    sortInfo: {},
    filterInfo: {},
  })

  const dataSourceRef = ref<Record<string, any>[]>([])
  const rawDataSourceRef = ref<Record<string, any>>({})

  watchEffect(() => {
    tableData.value = unref(dataSourceRef)
  })

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource }: any = unref(propsRef)
      dataSource && (dataSourceRef.value = dataSource)
    },
    {
      immediate: true,
    },
  )

  const getRowKey = computed(() => {
    const { rowKey }: any = unref(propsRef)
    return rowKey || (() => {
      return 'key'
    })
  })

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef)
    if (!dataSource || dataSource.length === 0)
      return unref(dataSourceRef)

    return unref(dataSourceRef)
  })

  async function fetch(opt?: FetchParams) {
    const {
      request,
      searchInfo,
      defSort,
      fetchSetting,
      beforeFetch,
      afterFetch,
      useSearchForm,
      pagination,
    } = unref(propsRef)
    if (!request || !isFunction(request))
      return

    try {
      setLoading(true)

      const { pageField, sizeField, listField, totalField } = Object.assign(
        {},
        FETCH_SETTING,
        fetchSetting,
      )
      let pageParams: Record<string, any> = {}

      const { page = 1, pageSize = PAGE_SIZE } = unref(getPaginationInfo) as PaginationProps

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        pageParams = {}
      }
      else {
        pageParams[pageField] = (opt && opt.page) || page
        pageParams[sizeField] = pageSize
      }

      const { sortInfo = {}, filterInfo } = searchState

      let params: Record<string, any> = merge(
        pageParams,
        useSearchForm ? getFieldsValue?.() : {},
        searchInfo,
        opt?.searchInfo ?? {},
        defSort,
        sortInfo,
        filterInfo,
        opt?.sortInfo ?? {},
        opt?.filterInfo ?? {},
      )

      if (beforeFetch && isFunction(beforeFetch))
        params = (await beforeFetch(params)) || params

      const res = await request(params)
      rawDataSourceRef.value = res

      const isArrayResult = Array.isArray(res)

      let resultItems: Record<string, any>[] = isArrayResult ? res : get(res, listField)
      const resultTotal: number = isArrayResult ? res.length : get(res, totalField)

      // 假如数据变少，导致总页数变少并小于当前选中页码，通过getPaginationRef获取到的页码是不正确的，需获取正确的页码再次执行
      if (resultTotal) {
        const currentTotalPage = Math.ceil(resultTotal / pageSize)
        if (page > currentTotalPage) {
          setPagination({
            page: currentTotalPage,
          })
          return await fetch(opt)
        }
      }

      if (afterFetch && isFunction(afterFetch))
        resultItems = (await afterFetch(resultItems)) || resultItems

      dataSourceRef.value = resultItems
      setPagination({
        itemCount: resultTotal || 0,
      })

      if (opt && opt.page) {
        setPagination({
          page: opt.page || 1,
        })
      }
      emits('fetch-success', {
        items: unref(resultItems),
        total: resultTotal,
      })
      return resultItems
    }
    catch (error) {
      emits('fetch-error', error)
      dataSourceRef.value = []
      setPagination({
        itemCount: 0,
      })
    }
    finally {
      setLoading(false)
    }
  }

  onMounted(() => {
    setTimeout(() => {
      fetch()
    }, 16)
  })

  function setTableData<T extends Record<string, any>>(values: T[]) {
    dataSourceRef.value = values
  }

  function getDataSource<T = Record<string, any>>() {
    return getDataSourceRef.value as T[]
  }

  function getRawDataSource<T = Record<string, any>>() {
    return rawDataSourceRef.value as T
  }

  async function reload(opt?: FetchParams) {
    return await fetch(opt)
  }

  onMounted(() => {
    useTimeoutFn(() => {
      unref(propsRef).immediate && fetch()
    }, 16)
  })

  return {
    getRowKey,
    getDataSourceRef,
    getDataSource,
    getRawDataSource,
    setTableData,
    fetch,
    reload,

  }
}
