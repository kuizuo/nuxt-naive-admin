import type { ModalProps } from 'naive-ui'
import type { ModalMethods, UseModalReturnType } from '../type'

export function useModal(): UseModalReturnType {
  const modal = ref<ModalMethods>()
  const currentInstance = getCurrentInstance()

  function register(modalInstance: ModalMethods) {
    if (!getCurrentInstance())
      throw new Error('useModal() can only be used inside setup() or functional components!')

    modal.value = modalInstance
    currentInstance?.emit('register', modalInstance)
  }

  const getInstance = () => {
    const instance = unref(modal.value)
    if (!instance)
      console.error('useModal instance is undefined!')

    return instance
  }

  const methods: ModalMethods = {
    setProps: (props: Partial<ModalProps>): void => {
      getInstance()?.setProps(props)
    },
    openModal: <T = any>(show = true, data?: T): void => {
      getInstance()?.openModal()
    },
    closeModal: () => {
      getInstance()?.closeModal()
    },
    setConfirmLoading: (status: boolean) => {
      getInstance()?.setConfirmLoading(status)
    },
  }

  return [register, methods]
}
