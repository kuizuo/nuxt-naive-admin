import { cloneDeep, get, isEmpty, merge, set, uniqBy } from 'lodash-es'
import dayjs from 'dayjs'
import type { FormActionType, FormProps, FormSchema } from '../types/form'
import { dateItemType } from '../helper'
import { isDef, isFunction } from '~~/utils/is'

declare type EmitType = (event: string | any, ...args: any[]) => void

interface UseFormActionContext {
  emit: EmitType
  getProps: ComputedRef<FormProps>
  getSchema: ComputedRef<FormSchema[]>
  formModel: Record<string, any>
  formElRef: Ref<FormActionType>
  schemaRef: Ref<FormSchema[]>
  defaultValueRef: Ref<Record<string, any>>
  loadingSub: Ref<boolean>
  handleFormValues: Function
}

function tryConstructArray(field: string, values: Record<string, any> = {}): any[] | undefined {
  const pattern = /^\[(.+)\]$/
  if (pattern.test(field)) {
    const match = field.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      if (!keys.length)
        return undefined

      const result: any[] | undefined = []
      keys.forEach((k, index) => {
        set(result, index, values[k.trim()])
      })

      return result.filter(Boolean).length ? result : undefined
    }
  }
}

function tryConstructObject(field: string, values: Record<string, any> = {}): Record<string, any> | undefined {
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
  defaultValueRef,
  formElRef,
  schemaRef,
  loadingSub,
  handleFormValues,
}: UseFormActionContext) {
  async function validate() {
    return unref(formElRef)?.validate()
  }

  function itemIsDateType(key: string) {
    return unref(getSchema).some((item) => {
      return item.field === key ? dateItemType.includes(item.component!) : false
    })
  }

  async function handleSubmit(e?: Event): Promise<void> {
    e && e.preventDefault()
    loadingSub.value = true
    const { submitFunc } = unref(getProps)
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc()
      loadingSub.value = false
      return
    }
    const formEl = unref(formElRef)
    if (!formEl)
      return
    try {
      await validate()
      const values = getFieldsValue()
      loadingSub.value = false
      emit('submit', values)
    }
    catch (error: any) {
      emit('submit', false)
      loadingSub.value = false
      console.error(error)
    }
  }

  // 清空校验
  async function restoreValidation() {
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
      formModel[key] = unref(defaultValueRef)[key] || null
    })
    await restoreValidation()
    const fromValues = handleFormValues(toRaw(unref(formModel)))
    emit('reset', fromValues)
    submitOnReset && (await handleSubmit())
  }

  function _setDefaultValue(data: FormSchema | FormSchema[]) {
    let schemas: FormSchema[] = []
    if (isObject(data))
      schemas.push(data as FormSchema)

    if (isArray(data))
      schemas = [...data]

    const obj: Record<string, any> = {}
    const currentFieldsValue = getFieldsValue()
    schemas.forEach((item) => {
      if (
        item.component !== 'NDivider'
        && Reflect.has(item, 'field')
        && item.field
        && !isNullOrUnDef(item.defaultValue)
        && (!(item.field in currentFieldsValue)
          || isNullOrUnDef(currentFieldsValue[item.field])
          || isEmpty(currentFieldsValue[item.field]))
      )
        obj[item.field] = item.defaultValue
    })
    setFieldsValue(obj)
  }

  // 获取表单值
  function getFieldsValue(): Record<string, any> {
    const formEl = unref(formElRef)
    if (!formEl)
      return {}
    return handleFormValues(toRaw(unref(formModel)))
  }

  async function updateSchema(data: Partial<FormSchema> | Partial<FormSchema>[]) {
    let updateData: Partial<FormSchema>[] = []
    if (isObject(data))
      updateData.push(data as FormSchema)

    if (isArray(data))
      updateData = [...data]

    const hasField = updateData.every(
      item => item.component === 'NDivider' || (Reflect.has(item, 'field') && item.field),
    )

    if (!hasField)
      throw new Error('All children of the form Schema array that need to be updated must contain the `field` field')

    const schema: FormSchema[] = []
    unref(getSchema).forEach((val) => {
      let _val: any
      updateData.forEach((item) => {
        if (val.field === item.field)
          _val = item
      })
      if (_val !== undefined && val.field === _val.field) {
        merge(val, _val) // const newSchema = deepMerge(val, _val) 会丢失 val 原有的响应式
        schema.push(val as FormSchema)
      }
      else {
        schema.push(val)
      }
    })
    _setDefaultValue(schema)

    schemaRef.value = uniqBy(schema, 'field')
  }

  async function resetSchema(data: Partial<FormSchema> | Partial<FormSchema>[]) {
    let updateData: Partial<FormSchema>[] = []
    if (isObject(data))
      updateData.push(data as FormSchema)

    if (isArray(data))
      updateData = [...data]

    const hasField = updateData.every(
      item => item.component === 'NDivider' || (Reflect.has(item, 'field') && item.field),
    )

    if (!hasField)
      throw new Error('All children of the form Schema array that need to be updated must contain the `field` field')

    schemaRef.value = updateData as FormSchema[]
  }

  async function setFieldsValue(values: Record<string, any>): Promise<void> {
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
    // validKeys 在 naive-ui 中没用到
    // validate().catch((_) => {})
  }

  function setLoading(value: boolean): void {
    loadingSub.value = value
  }

  return {
    handleSubmit,
    validate,
    getFieldsValue,
    updateSchema,
    resetSchema,
    resetFields,
    restoreValidation,
    setFieldsValue,
    setLoading,
  }
}
