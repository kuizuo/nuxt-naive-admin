<script setup lang="ts">
import { useForm } from '~/components/basic/form/hooks/useForm'
import type { FormSchema } from '~/components/basic/form/types/form'

definePageMeta({
  layout: 'admin',
  title: 'pages.comp.form',
  order: 3,
  icon: 'mdi:form-select',
  keepalive: true,
})

const schemas: FormSchema[] = [

  {
    field: 'name',
    component: 'NInput',
    label: '输入',
    labelMessage: '这是一个提示',
    componentProps: {
      placeholder: '请随便输入一些内容',
    },
    rules: [{ required: true, message: '还是需要输入一些东西', trigger: ['blur'] }],
  },
  {
    field: 'number',
    component: 'NInputNumber',
    label: '数字输入',
    defaultValue: 666,
  },
  {
    field: 'tags',
    component: 'NDynamicTags',
    label: '动态标签',
    defaultValue: ['vue', 'nuxt'],
  },
  {
    field: 'checkbox',
    component: 'NCheckboxGroup',
    label: '多选',
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
    giProps: {
      span: 12,
    },
  },
  {
    field: 'radio',
    component: 'NRadioButtonGroup',
    label: '单选',
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
    giProps: {
      span: 12,
    },
  },
  {
    field: 'language',
    component: 'NSelect',
    label: '编程语言',
    componentProps: {
      placeholder: '请选择你最喜欢的编程语言',
      options: [
        {
          label: 'JavaScript',
          value: 1,
        },
        {
          label: 'TypeScript',
          value: 2,
        },
        {
          label: 'Python',
          value: 3,
        },
        {
          label: 'Java',
          value: 4,
        },
      ],
      onUpdateValue: (e: any) => {
        console.log(e)
      },
    },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'tree',
    component: 'NTreeSelect',
    label: '树形选择',
    componentProps: {
      options: [
        {
          label: 'Rubber Soul',
          key: 'Rubber Soul',
          children: [
            {
              label: 'Drive My Car',
              key: 'Drive My Car',
            },
            {
              label: 'Michelle',
              key: 'Michelle',
            },
          ],
        },
      ],
    },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'date',
    label: '日期',
    component: 'NDatePicker',
    giProps: {
      span: 12,
    },
  },
  {
    field: 'time',
    label: ' 时间',
    component: 'NTimePicker',
    giProps: {
      span: 12,
    },
  },
  {
    field: 'color',
    label: '颜色',
    component: 'NColorPicker',

  },
  {
    field: 'slide',
    label: '滑块',
    component: 'NSlider',

  },
  {
    field: 'rate',
    label: '评分',
    component: 'NRate',
    componentProps: {
      allowHalf: true,
    },
    defaultValue: 2.5,
  },
  {
    field: 'switch',
    label: '开关',
    component: 'NSwitch',
  },
  {
    field: 'slot',
    label: '自定义插槽',
    slot: 'cunstom',
  },
]

const [register, { getFieldsValue }] = useForm({
  // 表单布局
  gridProps: {
    cols: 24,
    xGap: 8,
  },
  // 表单子项基本布局
  giProps: {
    span: 24,
  },
  schemas,
  submitButtonText: '提交',
  submitFunc: async () => {
    const values = getFieldsValue()
    console.log(values)
  },
})
</script>

<template>
  <BasicPage title="基础表单" content-full-height content-class="p-4">
    <BasicForm @register="register">
      <template #cunstom="{ model, field }">
        <NInput v-model:value="model[field]" />
      </template>
    </BasicForm>
  </BasicPage>
</template>
