<script lang="ts" setup>
import type { ModalProps } from 'naive-ui'
import { basicProps } from './props'
import type { ModalMethods } from './type'

const props = defineProps(basicProps)
const emit = defineEmits(['close', 'success', 'register'])
const attrs = useAttrs()
const propsRef = ref<Partial<ModalProps> | null>(null)

const showModal = ref(false)
const loading = ref(false)

const getProps = computed(() => {
  return { ...props, ...(unref(propsRef) as any) }
})

const okText = computed(() => {
  return (propsRef.value as any)?.okText || props?.okText
})

async function setProps(modalProps: Partial<ModalProps>): Promise<void> {
  propsRef.value = deepMerge(unref(propsRef) || ({} as any), modalProps)
}

const getBindValue = computed(() => {
  return {
    ...attrs,
    ...unref(getProps),
    ...unref(propsRef),
  }
})

function setLoading(status: boolean) {
  loading.value = status
}

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  loading.value = false
  emit('close')
}

function onCloseModal() {
  showModal.value = false
  emit('close')
}

function handleSubmit() {
  loading.value = true
  emit('success')
}

const modalMethods: ModalMethods = {
  setProps,
  openModal,
  closeModal,
  setLoading,
}

const instance = getCurrentInstance()

if (instance)
  emit('register', modalMethods)

defineExpose(modalMethods)
</script>

<template>
  <n-modal v-bind="getBindValue" v-model:show="showModal" @close="onCloseModal">
    <template #header>
      <div class="w-full">
        {{ getBindValue.title }}
      </div>
    </template>
    <slot />
    <template v-if="!$slots.action" #action>
      <n-space>
        <n-button @click="closeModal">
          取消
        </n-button>
        <n-button type="primary" :loading="Loading" @click="handleSubmit">
          {{ okText }}
        </n-button>
      </n-space>
    </template>
    <template v-else #action>
      <slot name="action" />
    </template>
  </n-modal>
</template>
