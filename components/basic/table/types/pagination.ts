export interface PaginationProps {
  size?: 'small' | 'medium' | 'large'
  page?: number
  pageCount?: number
  itemCount?: number | undefined
  pageSize?: number
  pageSizes?: number[]
  showSizePicker?: boolean
  showQuickJumper?: boolean
  prefix?: (obj: { itemCount: number }) => string
}
