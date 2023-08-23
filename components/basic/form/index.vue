<script setup lang="ts">
import type { GridProps } from 'naive-ui/lib/grid'
import { useFormEvents } from './hooks/useFormEvents'
import { useFormValues } from './hooks/useFormValues'
import { componentMap } from './componentMap'

import type { FormActionType, FormProps, FormSchema } from './types/form'
import { basicProps } from './props'
import { createFormContext } from './hooks/useFormContext'

const props = defineProps(basicProps)
const emit = defineEmits(['reset', 'submit', 'register'])
const attrs = useAttrs()

const defaultValueRef = ref<Record<string, any>>({})
const formModel = reactive<Record<string, any>>({})
const propsRef = ref<Partial<FormProps> | null>(null)
const schemaRef = ref<FormSchema[] | null>(null)
const formElRef = ref<FormActionType | null>(null)
const gridCollapsed = ref(true)
const loadingSub = ref(false)
const isUpdateDefaultRef = ref(false)

const getSubmitBtnOptions = computed(() => {
  return Object.assign(
    {
      size: props.size,
      type: 'primary',
    },
    props.submitButtonOptions,
  )
})

const getResetBtnOptions = computed(() => {
  return Object.assign(
    {
      size: props.size,
      type: 'default',
    },
    props.resetButtonOptions,
  )
})

function getComponentProps(schema: any) {
  const compProps = schema.componentProps ?? {}
  return {
    ...compProps,
  }
}

const getProps = computed((): FormProps => {
  const formProps = { ...props, ...unref(propsRef) } as FormProps
  const rulesObj: any = {
    rules: {},
  }
  const schemas: any = formProps.schemas || []
  schemas.forEach((item: any) => {
    if (item.rules && isArray(item.rules))
      rulesObj.rules[item.field] = item.rules
  })
  return { ...formProps, ...unref(rulesObj) }
})

const isInline = computed(() => {
  const { layout, inline } = unref(getProps)
  return layout === 'inline' || inline
})

const getGrid = computed((): GridProps => {
  const { gridProps } = unref(getProps)
  return {
    ...gridProps,
    collapsed: isInline.value ? gridCollapsed.value : false,
    responsive: 'screen',
  }
})

const getBindValue = computed(
  () => ({ ...attrs, ...props, ...unref(getProps) } as Record<string, any>),
)

const getSchema = computed((): FormSchema[] => {
  const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any)
  for (const schema of schemas) {
    const { defaultValue } = schema

    if (defaultValue)
      schema.defaultValue = defaultValue

    schema.giProps = {
      ...(unref(getProps).giProps),
      ...(schema.giProps),
    }
  }
  return schemas as FormSchema[]
})

const { handleFormValues, initDefault } = useFormValues({
  defaultValueRef,
  getSchema,
  formModel,
})

const {
  handleSubmit,
  validate,
  resetFields,
  getFieldsValue,
  restoreValidation,
  setFieldsValue,
  updateSchema,
  resetSchema,
} = useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  formElRef: formElRef as Ref<FormActionType>,
  schemaRef: schemaRef as Ref<FormSchema[]>,
  defaultValueRef,
  loadingSub,
  handleFormValues,
})

createFormContext({
  resetAction: resetFields,
  submitAction: handleSubmit,
})

function unfoldToggle() {
  gridCollapsed.value = !gridCollapsed.value
}

async function setProps(formProps: Partial<FormProps>): Promise<void> {
  propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
}

const formActionType: Partial<FormActionType> = {
  getFieldsValue,
  setFieldsValue,
  resetFields,
  updateSchema,
  resetSchema,
  setProps,
  validate,
  restoreValidation,
  submit: handleSubmit,
}

watch(
  () => getSchema.value,
  (schema: any) => {
    if (unref(isUpdateDefaultRef))
      return

    if (schema?.length) {
      initDefault()
      isUpdateDefaultRef.value = true
    }
  },
)
watch(
  () => unref(getProps).schemas,
  (schemas) => {
    resetSchema(schemas ?? [])
  },
)

onMounted(() => {
  initDefault()
  emit('register', formActionType)
})
</script>

<template>
  <NForm v-bind="getBindValue" ref="formElRef" :model="formModel">
    <NGrid v-bind="getGrid">
      <NGi v-for="schema in getSchema" v-bind="schema.giProps" :key="schema.field">
        <NFormItem :label="schema.label" :path="schema.field">
          <template v-if="schema.labelMessage" #label>
            {{ schema.label }}
            <NTooltip trigger="hover" :style="schema.labelMessageStyle">
              <template #trigger>
                <NIcon size="18" class="text-gray-400 cursor-pointer">
                  <Icon name="ant-design:question-circle-outlined" />
                </NIcon>
              </template>
              {{ schema.labelMessage }}
            </NTooltip>
          </template>

          <!-- 判断插槽 -->
          <template v-if="schema.slot">
            <slot
              :name="schema.slot"
              :model="formModel"
              :field="schema.field"
              :value="formModel[schema.field]"
            />
          </template>

          <!-- NCheckbox -->
          <template v-else-if="schema.component === 'NCheckboxGroup'">
            <NCheckboxGroup v-model:value="formModel[schema.field]">
              <NSpace>
                <NCheckbox
                  v-for="item in schema.componentProps?.options"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </NSpace>
            </NCheckboxGroup>
          </template>

          <!-- NRadioGroup -->
          <template v-else-if="schema.component === 'NRadioGroup'">
            <NRadioGroup v-model:value="formModel[schema.field]">
              <NSpace>
                <NRadio
                  v-for="item in schema.componentProps?.options"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </NRadio>
              </NSpace>
            </NRadioGroup>
          </template>

          <!-- NRadioButtonGroup -->
          <template v-else-if="schema.component === 'NRadioButtonGroup'">
            <NRadioGroup v-model:value="formModel[schema.field]">
              <NSpace>
                <NRadioButton
                  v-for="item in schema.componentProps?.options"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </NRadioButton>
              </NSpace>
            </NRadioGroup>
          </template>

          <component
            v-bind="getComponentProps(schema)"
            :is="componentMap.get(schema.component!)"
            v-else
            v-model:value="formModel[schema.field]"
          />

          <template v-if="schema.suffix">
            <slot
              :name="schema.suffix"
              :model="formModel"
              :field="schema.field"
              :value="formModel[schema.field]"
            />
          </template>
        </NFormItem>
      </NGi>

      <NGi
        v-if="getProps.showActionButtonGroup"
        :span="isInline ? '' : 24"
        :suffix="isInline ? true : false"
        #="{ overflow }"
      >
        <NSpace
          align="center"
          :justify="isInline ? 'end' : 'start'"
          :style="{ 'margin-left': `${isInline ? 12 : getProps.labelWidth}px` }"
        >
          <NButton
            v-if="getProps.showSubmitButton"
            v-bind="getSubmitBtnOptions"
            :loading="loadingSub"
            @click="handleSubmit"
          >
            {{ getProps.submitButtonText }}
          </NButton>
          <NButton
            v-if="getProps.showResetButton"
            v-bind="getResetBtnOptions"
            @click="resetFields"
          >
            {{ getProps.resetButtonText }}
          </NButton>
          <NButton
            v-if="isInline && getProps.showAdvancedButton"
            type="primary"
            text
            icon-placement="right"
            @click="unfoldToggle"
          >
            <template #icon>
              <NIcon v-if="overflow" size="14" class="unfold-icon">
                <Icon name="ant-design:down-outlined" />
              </NIcon>
              <NIcon v-else size="14" class="unfold-icon">
                <Icon name="ant-design:up-outlined" />
              </NIcon>
            </template>
            {{ overflow ? '展开' : '收起' }}
          </NButton>
        </NSpace>
      </NGi>
    </NGrid>
  </NForm>
</template>
