import { unref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { set } from 'lodash-es'
import type { FormSchema } from '../types/form'
import { isArray, isFunction, isNullOrUnDef, isObject, isString } from '~/utils/is'

interface UseFormValuesContext {
  defaultValueRef: Ref<any>
  getSchema: ComputedRef<FormSchema[]>
  formModel: Record<string, any>
}
export function useFormValues({ defaultValueRef, getSchema, formModel }: UseFormValuesContext) {
  function handleFormValues(values: Record<string, any>) {
    if (!isObject(values))
      return {}

    const res: Record<string, any> = {}
    for (const item of Object.entries(values)) {
      let [, value] = item
      const [key] = item
      if (
        !key
        || (isArray(value) && value.length === 0)
        || isFunction(value)
        || isNullOrUnDef(value)
      )
        continue

      // 删除空格
      if (isString(value))
        value = value.trim()

      set(res, key, value)
    }
    return res
  }

  // 初始化默认值
  function initDefault() {
    const schemas = unref(getSchema)
    const obj: Record<string, any> = {}
    schemas.forEach((item) => {
      const { defaultValue } = item
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue
        formModel[item.field] = defaultValue
      }
    })
    defaultValueRef.value = obj
  }

  return { handleFormValues, initDefault }
}
