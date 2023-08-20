import { inject, provide } from 'vue'

export interface FormContextProps {
  resetAction: () => Promise<void>
  submitAction: () => Promise<void>
}

const key: InjectionKey<FormContextProps> = Symbol('formElRef')

export function createFormContext(instance: FormContextProps) {
  provide(key, instance)
}

export function useFormContext() {
  return inject(key)
}
