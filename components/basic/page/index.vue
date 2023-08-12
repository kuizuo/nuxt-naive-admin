<script lang="ts" setup inheritAttrs="false">
import type { CSSProperties } from 'vue'

import { omit } from 'lodash-es'

interface Props {
  title?: string
  subtitle?: string
  content?: string
  dense?: boolean
  contentStyle?: CSSProperties
  contentBackground?: boolean
  contentFullHeight?: boolean
  contentClass?: string
  fixedHeight?: boolean
  upwardSpace?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  contentBackground: false,
  contentFullHeight: false,
  upwardSpace: 0,
})

const slots = useSlots()
const attrs = useAttrs()

const wrapperRef = ref<HTMLDivElement | null>(null)
const headerRef = ref<HTMLDivElement | null>(null)
const contentRef = ref(null)

const contentHeight = computed(() => {
  const { upwardSpace } = props

  const wrapperHeight = wrapperRef.value?.offsetHeight || 0
  const headerHeight = headerRef.value?.offsetHeight || 0
  const upward = typeof upwardSpace === 'number' ? upwardSpace : Number.parseInt(upwardSpace)

  return wrapperHeight - headerHeight - upward
})

const getHeaderSlots = computed(() => {
  return Object.keys(omit(slots, 'default', 'headerContent'))
})

const getShowHeader = computed(() => props.content || slots?.headerContent || props.title || getHeaderSlots.value.length)

const getClass = computed(() => {
  return [
    {
      dense: props.dense,
    },
    attrs.class ?? {},
  ]
})

const getContentStyle = computed((): CSSProperties => {
  const { contentFullHeight, contentStyle, fixedHeight } = props
  if (!contentFullHeight)
    return { ...contentStyle }

  const height = `${unref(contentHeight)}px`
  return {
    ...contentStyle,
    minHeight: height,
    ...(fixedHeight ? { height } : {}),
  }
})

const getContentClass = computed(() => {
  const { contentBackground, contentClass } = props
  return [
    'content',
    contentClass,
    {
      'content-bg': contentBackground,
    },
  ]
})
</script>

<template>
  <div ref="wrapperRef" :class="getClass" class="h-full relative">
    <n-page-header v-if="getShowHeader" v-bind="omit($attrs, 'class')" ref="headerRef" class="p-4" :title="title">
      <template #default>
        <template v-if="content">
          {{ content }}
        </template>
        <slot v-else name="headerContent" />
      </template>

      <template v-for="(item, index) in getHeaderSlots" #[item]="data" :key="index">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </n-page-header>

    <div ref="contentRef" class="overflow-hidden" :class="getContentClass" :style="getContentStyle">
      <slot />
    </div>
  </div>
</template>

<style scoped>
:deep(.n-page-header-content:empty) {
  margin-top: 0;
}

.content {
  margin: 16px;
}

.dense {
  margin: 0px;
}

.content-bg {
  background-color: #f0f2f5;
}
</style>
