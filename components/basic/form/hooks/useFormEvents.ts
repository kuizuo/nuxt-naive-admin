import { cloneDeep, get } from 'lodash'
import type { FormActionType, FormProps, FormSchema } from '../types/form'
import { dateItemType } from '../helper'
import { isFunction } from '~~/utils/is'

declare type EmitType = (event: string, ...args: any[]) => void

interface UseFormActionContext {
  emit: EmitType
  getProps: ComputedRef<FormProps>
  getSchema: ComputedRef<FormSchema[]>
  formModel: Record<string, any>
  formElRef: Ref<FormActionType>
  defaultFormModel: Record<string, any>
  loadingSub: Ref<boolean>
  handleFormValues: Function
}

interface UseFormActionContext {
  emit: EmitType
  getProps: ComputedRef<FormProps>
  getSchema: ComputedRef<FormSchema[]>
  formModel: Recordable
  defaultValueRef: Ref<Recordable>
  formElRef: Ref<FormActionType>
  schemaRef: Ref<FormSchema[]>
  handleFormValues: Fn
}

function tryConstructArray(field: string, values: Recordable = {}): any[] | undefined {
  const pattern = /^\[(.+)\]$/
  if (pattern.test(field)) {
    const match = field.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      if (!keys.length)
        return undefined

      const result = []
      keys.forEach((k, index) => {
        set(result, index, values[k.trim()])
      })

      return result.filter(Boolean).length ? result : undefined
    }
  }
}

function tryConstructObject(field: string, values: Recordable = {}): Recordable | undefined {
  const pattern = /^\{(.+)\}$/
  if (pattern.test(field)) {
    const match = field.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      if (!keys.length)
        return

      const result = {}
      keys.forEach((k) => {
        set(result, k.trim(), values[k.trim()])
      })

      return Object.values(result).filter(Boolean).length ? result : undefined
    }
  }
}

export function useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  formElRef,
  defaultFormModel,
  loadingSub,
  handleFormValues,
}: UseFormActionContext) {
  // 验证
  async function validate() {
    return unref(formElRef)?.validate()
  }

  /**
   * @description: Is it time
   */
  function itemIsDateType(key: string) {
    return unref(getSchema).some((item) => {
      return item.field === key ? dateItemType.includes(item.component) : false
    })
  }

  async function validateFields(nameList?: NamePath[] | undefined) {
    return unref(formElRef)?.validateFields(nameList)
  }

  // 提交
  async function handleSubmit(e?: Event): Promise<void> {
    e && e.preventDefault()
    loadingSub.value = true
    const { submitFunc } = unref(getProps)
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc()
      loadingSub.value = false
      return false
    }
    const formEl = unref(formElRef)
    if (!formEl)
      return false
    try {
      await validate()
      const values = getFieldsValue()
      loadingSub.value = false
      emit('submit', values)
      return values
    }
    catch (error: any) {
      emit('submit', false)
      loadingSub.value = false
      console.error(error)
      return false
    }
  }

  // 清空校验
  async function clearValidate() {
    await unref(formElRef)?.restoreValidation()
  }

  // 重置
  async function resetFields(): Promise<void> {
    const { resetFunc, submitOnReset } = unref(getProps)
    resetFunc && isFunction(resetFunc) && (await resetFunc())

    const formEl = unref(formElRef)
    if (!formEl)
      return
    Object.keys(formModel).forEach((key) => {
      formModel[key] = unref(defaultFormModel)[key] || null
    })
    await clearValidate()
    const fromValues = handleFormValues(toRaw(unref(formModel)))
    emit('reset', fromValues)
    submitOnReset && (await handleSubmit())
  }

  // 获取表单值
  function getFieldsValue(): Record<string, any> {
    const formEl = unref(formElRef)
    if (!formEl)
      return {}
    return handleFormValues(toRaw(unref(formModel)))
  }

  async function setFieldsValue(values: Recordable): Promise<void> {
    const fields = unref(getSchema)
      .map(item => item.field)
      .filter(Boolean)

    // key 支持 a.b.c 的嵌套写法
    const delimiter = '.'
    const nestKeyArray = fields.filter(item => String(item).includes(delimiter))

    const validKeys: string[] = []
    fields.forEach((key) => {
      const schema = unref(getSchema).find(item => item.field === key)
      const value = get(values, key)
      const hasKey = !!get(values, key)

      const { componentProps } = schema || {}
      let _props = componentProps as any
      if (typeof componentProps === 'function')
        _props = _props({ formModel: unref(formModel) })

      const constructValue = tryConstructArray(key, values) || tryConstructObject(key, values)

      // 0| '' is allow
      if (hasKey || !!constructValue) {
        const fieldValue = constructValue || value
        // time type
        if (itemIsDateType(key)) {
          if (Array.isArray(fieldValue)) {
            const arr: any[] = []
            for (const ele of fieldValue)
              arr.push(ele ? dayjs(ele) : null)

            unref(formModel)[key] = arr
          }
          else {
            unref(formModel)[key] = fieldValue
              ? _props?.valueFormat
                ? fieldValue
                : dayjs(fieldValue)
              : null
          }
        }
        else {
          unref(formModel)[key] = fieldValue
        }
        if (_props?.onChange)
          _props?.onChange(fieldValue)

        validKeys.push(key)
      }
      else {
        nestKeyArray.forEach((nestKey: string) => {
          try {
            const value = nestKey.split('.').reduce((out, item) => out[item], values)
            if (isDef(value)) {
              unref(formModel)[nestKey] = unref(value)
              validKeys.push(nestKey)
            }
          }
          catch (e) {
            // key not exist
            if (isDef(defaultValueRef.value[nestKey]))
              unref(formModel)[nestKey] = cloneDeep(unref(defaultValueRef.value[nestKey]))
          }
        })
      }
    })
    validateFields(validKeys).catch((_) => {})
  }

  function setLoading(value: boolean): void {
    loadingSub.value = value
  }

  return {
    handleSubmit,
    validate,
    resetFields,
    getFieldsValue,
    clearValidate,
    setFieldsValue,
    setLoading,
  }
}
