const {
  pageSizeOptions,
  defaultPageSize,
  fetchSetting,
  defaultSize,
  defaultFilterFn,
} = {
  // Form interface request general configuration
  // support xxx.xxx.xxx
  fetchSetting: {
    // The field name of the current page passed to the background
    pageField: 'page',
    // The number field name of each page displayed in the background
    sizeField: 'pageSize',
    // Field name of the form data returned by the interface
    listField: 'items',
    // Total number of tables returned by the interface field name
    totalField: 'meta.total',
  },
  // Number of pages that can be selected
  pageSizeOptions: [10, 50, 80, 100],
  // Default display quantity on one page
  defaultPageSize: 10,
  // Default Size
  defaultSize: 'medium',
  // Custom general filter function
  defaultFilterFn: (data: Partial<Record<string, string[]>>) => {
    return data
  },

}

export const ROW_KEY = 'key'

export const PAGE_SIZE_OPTIONS = pageSizeOptions

export const PAGE_SIZE = defaultPageSize

export const FETCH_SETTING = fetchSetting

export const DEFAULT_SIZE = defaultSize

export const DEFAULT_FILTER_FN = defaultFilterFn

export const DEFAULT_ALIGN = 'center'

export const INDEX_COLUMN_FLAG = 'INDEX'

export const ACTION_COLUMN_FLAG = 'ACTION'
