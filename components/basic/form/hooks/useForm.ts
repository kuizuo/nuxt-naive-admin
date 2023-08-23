import type { FormActionType, FormProps, UseFormReturnType } from '../types/form'

type Props = Partial<FormProps>

export function useForm(props?: Props): UseFormReturnType {
  const formRef = ref<FormActionType | null>(null)
  const loadedRef = ref<boolean>(false)

  async function getForm() {
    const form = unref(formRef)
    if (!form) {
      console.error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!',
      )
    }
    await nextTick()
    return form as FormActionType
  }

  function register(instance: FormActionType) {
    if (unref(loadedRef) && instance === unref(formRef))
      return

    formRef.value = instance
    loadedRef.value = true

    watch(
      () => props,
      () => {
        props && instance.setProps(props)
      },
      {
        immediate: true,
        deep: true,
      },
    )
  }

  const methods: FormActionType = {
    setProps: async (formProps: Partial<FormProps>) => {
      const form = await getForm()
      await form.setProps(formProps)
    },

    resetFields: async () => {
      getForm().then(async (form) => {
        await form.resetFields()
      })
    },

    restoreValidation: async (name?: string | string[]) => {
      const form = await getForm()
      await form.restoreValidation(name)
    },

    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T
    },

    setFieldsValue: async <T = any>(values: T) => {
      const form = await getForm()
      await form.setFieldsValue(values)
    },

    submit: async (): Promise<any> => {
      const form = await getForm()
      return form.submit()
    },

    validate: async (nameList?: any[]): Promise<Record<string, any>> => {
      const form = await getForm()
      return form.validate(nameList)
    },

    setLoading: (value: boolean) => {
      loadedRef.value = value
    },

    updateSchema: async (values) => {
      const form = await getForm()
      form.updateSchema(values)
    },
  }

  return [register, methods]
}
