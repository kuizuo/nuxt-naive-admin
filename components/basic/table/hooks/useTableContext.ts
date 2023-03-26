import type { ComputedRef, Ref } from 'vue'
import { inject, provide } from 'vue'
import type { BasicTableProps, TableActionType } from '../types/table'

const key = Symbol('basic-table')

type Instance = TableActionType & {
  wrapRef: Ref<HTMLElement | null>
  getBindValues: ComputedRef<Record<string, any>>
}

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<BasicTableProps>
}

export function createTableContext(instance: Instance) {
  provide(key, instance)
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance
}
