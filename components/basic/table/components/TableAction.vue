<script lang="ts" setup>
import { computed, toRaw } from 'vue'
import { isBoolean, isFunction } from 'lodash-es'
import type { ActionItem } from '../types/tableAction'

const props = withDefaults(defineProps<{
  actions?: ActionItem[] | null
  dropDownActions?: ActionItem[] | null
  style?: 'button' | 'text'
}>(), {
  actions: null,
  dropDownActions: null,
  style: 'button',
})

const actionType
        = props.style === 'button' ? 'default' : props.style === 'text' ? 'primary' : 'default'
const actionText
        = props.style === 'button' ? undefined : props.style === 'text' ? true : undefined

const getMoreProps = computed(() => {
  return {
    text: actionText,
    type: actionType,
    size: 'small',
  }
})

function isIfShow(action: ActionItem): boolean {
  const ifShow = action.ifShow

  let isIfShow = true

  if (isBoolean(ifShow))
    isIfShow = ifShow

  if (isFunction(ifShow))
    isIfShow = ifShow(action)

  return isIfShow
}

const getActions = computed(() => {
  return (toRaw(props.actions) || [])
    // .filter((action) => {
    //   return hasPermission(action.auth as string[]) && isIfShow(action)
    // })
    .map((action) => {
      const { popConfirm } = action
      return {
        size: 'large',
        text: actionText,
        type: actionType,
        ...action,
        ...(popConfirm || {}),
        onConfirm: popConfirm?.confirm,
        onCancel: popConfirm?.cancel,
        enable: !!popConfirm,
      }
    }) as any[]
})

const getDropdownList = computed((): any[] => {
  return (toRaw(props.dropDownActions) || [])
    // .filter((action) => {
    //   return hasPermission(action.auth as string[]) && isIfShow(action)
    // })
    .map((action) => {
      const { popConfirm } = action
      return {
        size: 'small',
        text: actionText,
        type: actionType,
        ...action,
        ...popConfirm,
        onConfirm: popConfirm?.confirm,
        onCancel: popConfirm?.cancel,
      }
    })
})
</script>

<template>
  <div class="tableAction">
    <div class="flex items-center justify-center">
      <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
        <NTooltip v-if="action.tooltip">
          <template #trigger>
            <NButton v-bind="action" class="mx-2">
              <template v-if="action.icon" #icon>
                <Icon :name="action.icon" class="ml-1" />
              </template>
              <span v-if="action.label">{{ action.label }}</span>
            </NButton>
          </template>
          {{ action.tooltip }}
        </NTooltip>
        <NButton v-else v-bind="action" class="mx-2">
          <template v-if="action.icon" #icon>
            <Icon :name="action.icon" class="ml-1" />
          </template>
          <span v-if="action.label">{{ action.label }}</span>
        </NButton>
      </template>

      <NDropdown
        v-if="props.dropDownActions && getDropdownList.length"
        trigger="hover"
        :options="getDropdownList"
      >
        <slot name="more" />
        <NButton v-if="!$slots.more" class="mx-2">
          <div class="flex items-center">
            <Icon name="ant-design:more-outlined" class="ml-1" />
          </div>
        </NButton>
      </NDropdown>
    </div>
  </div>
</template>
