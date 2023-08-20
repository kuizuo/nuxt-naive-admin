<script setup lang="ts">
import { useForm } from '~/components/basic/form/hooks/useForm'
import type { FormSchema } from '~/components/basic/form/types/form'

definePageMeta({
  layout: 'admin',
  title: '表单',
  order: 3,
  icon: 'mdi:form-select',
  keepalive: true,
})

const schemas: FormSchema[] = [

  {
    field: 'name',
    component: 'NInput',
    label: '姓名',
    labelMessage: '这是一个提示',
    componentProps: {
      placeholder: '请输入姓名',
    },
    rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
  },
  {
    field: 'mobile',
    component: 'NInputNumber',
    label: '手机',
    componentProps: {
      placeholder: '请输入手机号码',
      showButton: false,
      onInput: (e: any) => {
        console.log(e)
      },
    },
  },
  {
    field: 'options',
    component: 'NCheckboxGroup',
    label: '选项',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'type',
    component: 'NSelect',
    label: '类型',
    componentProps: {
      placeholder: '请选择类型',
      options: [
        {
          label: '舒适性',
          value: 1,
        },
        {
          label: '经济性',
          value: 2,
        },
      ],
      onUpdateValue: (e: any) => {
        console.log(e)
      },
    },
  },
  {
    field: 'status',
    label: '状态',
    slot: 'status',
  },
]

const [register, { getFieldsValue }] = useForm({
  gridProps: { cols: 1 },
  collapsedRows: 3,
  schemas,
  layout: 'horizontal',
  submitButtonText: '提交',
  submitFunc: async () => {
    const values = getFieldsValue()
    console.log(values)
  },
})
</script>

<template>
  <BasicPage title="基础表单" content-full-height>
    <BasicForm @register="register">
      <template #status="{ model, field }">
        <NInput v-model:value="model[field]" />
      </template>
    </BasicForm>
  </BasicPage>
</template>
