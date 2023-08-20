import type { CSSProperties, PropType } from 'vue'
import type { GridItemProps, GridProps } from 'naive-ui/lib/grid'
import type { ButtonProps } from 'naive-ui/lib/button'
import type { FormSchema } from './types/form'

export const basicProps = {
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 'auto',
  },
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  layout: {
    type: String,
    default: 'horizontal',
  },
  inline: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium',
  },
  labelPlacement: {
    type: String,
    default: 'left',
  },
  isFull: {
    type: Boolean,
    default: true,
  },
  showActionButtonGroup: {
    type: Boolean,
    default: true,
  },
  showResetButton: {
    type: Boolean,
    default: true,
  },
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  showAdvancedButton: {
    type: Boolean,
    default: true,
  },
  submitButtonText: {
    type: String,
    default: '提交',
  },
  resetButtonText: {
    type: String,
    default: '重置',
  },
  gridProps: {
    type: Object as PropType<GridProps>,
    default(rawProps) {
      return { cols: 1, gap: 8 }
    },
  },
  giProps: Object as PropType<GridItemProps>,
  baseGridStyle: {
    type: Object as PropType<CSSProperties>,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  collapsedRows: {
    type: Number,
    default: 1,
  },
}
