import type { ComponentType } from './types/index'

export function createPlaceholderMessage(component: ComponentType) {
  if (component === 'NInput')
    return '请输入'
  if (
    ['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(
      component,
    )
  )
    return '请选择'
  return ''
}

export function defaultType(component: string) {
  if (component === 'NInput')
    return ''
  if (component === 'NInputNumber')
    return null
  return [
    'NPicker',
    'NSelect',
    'NCheckbox',
    'NRadio',
    'NSwitch',
    'NDatePicker',
    'NTimePicker',
  ].includes(component)
    ? ''
    : undefined
}

export const dateItemType = ['NDatePicker', 'NTimePicker']
