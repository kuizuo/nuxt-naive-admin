import type { PropType } from 'vue'
import { NDataTable } from 'naive-ui'
import type { TableBaseColumn } from 'naive-ui/es/data-table/src/interface'
import type { BasicTableProps } from './types/table'

export const basicProps: BasicTableProps = {
  ...NDataTable.props,
  title: {
    type: String,
    default: null,
  },
  titleTooltip: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'medium',
  },
  dataSource: {
    type: [Object],
    default: () => [],
  },
  columns: {
    type: [Array] as PropType<TableBaseColumn[]>,
    default: () => [],
    required: true,
  },
  beforeRequest: {
    type: Function as PropType<(...arg: any[]) => void | Promise<any>>,
    default: null,
  },
  request: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  afterRequest: {
    type: Function as PropType<(...arg: any[]) => void | Promise<any>>,
    default: null,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record: any) => string)>,
    default: undefined,
  },
  pagination: {
    type: [Object, Boolean],
    default: () => {},
  },
  actionColumn: {
    type: Object as PropType<TableBaseColumn>,
    default: null,
  },

}
