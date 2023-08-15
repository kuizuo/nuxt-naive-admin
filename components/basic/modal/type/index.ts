import type { ModalProps } from 'naive-ui'

export interface ModalMethods {
  setProps: (props: Partial<ModalProps>) => void
  openModal: (props?: boolean) => void
  closeModal: () => void
  setLoading: (status: boolean) => void
}

export type RegisterFn = (ModalInstance: ModalMethods) => void

export type UseModalReturnType = [RegisterFn, ModalMethods]
