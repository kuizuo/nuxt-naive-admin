import type { NButton } from 'naive-ui'
import type { Component } from 'vue'

export interface ActionItem extends Partial<InstanceType<typeof NButton>> {
  onClick?: Fn
  label?: string

  popConfirm?: PopConfirm
  disabled?: boolean
  divider?: boolean
  // 权限编码控制是否显示
  // auth?: PermissionsEnum | PermissionsEnum[] | string | string[]
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean)
}

export interface PopConfirm {
  title: string
  okText?: string
  cancelText?: string
  confirm: Fn
  cancel?: Fn
  icon?: Component
}
