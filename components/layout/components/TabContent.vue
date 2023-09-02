<script setup lang="tsx">
import type { RouteLocationNormalized } from 'vue-router'
import { useThemeVars } from 'naive-ui'
import { Icon } from '#components'

const props = defineProps<{
  tabItem: RouteLocationNormalized
  isTab?: boolean
}>()

const { t } = useI18n()
const themeVars = useThemeVars()
const tabStore = useTabStore()
const route = useRoute()
const router = useRouter()

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)

const current = ref(null as unknown as RouteLocationNormalized)
const currentIndex = ref(-1)

const tabList = computed(() => tabStore.tabList)
const title = computed(() => {
  const { tabItem: { meta } = {} } = props
  return meta && t(meta.title!)
})

const getTargetTab = computed((): RouteLocationNormalized => {
  return unref(props.isTab) ? props.tabItem : route
})

const options = computed(() => {
  if (!unref(getTargetTab))
    return

  const { meta } = unref(getTargetTab)
  const { path } = unref(router.currentRoute)

  const isCurItem = current.value ? current.value.path === path : false

  // Refresh button
  const index = currentIndex.value
  const refreshDisabled = !isCurItem

  const disabled = unref(tabList).length <= 1

  const close_rightDisabled
      = !isCurItem || (index === tabStore.tabList.length - 1)

  return [
    {
      label: t('layout.tabs.reload'),
      key: 'refresh',
      icon: renderIcon('ion:reload-sharp'),
      disabled: refreshDisabled,
    },
    {
      label: t('layout.tabs.close'),
      key: 'close',
      icon: renderIcon('clarity:close-line'),
      disabled: !!meta?.affix || disabled,
    },
    {
      label: t('layout.tabs.close_other'),
      key: 'close_other',
      icon: renderIcon('dashicons:align-center'),
      disabled,
    },
    {
      label: t('layout.tabs.close_right'),
      key: 'close_right',
      icon: renderIcon('ant-design:right-square-outlined'),
      disabled: close_rightDisabled,
    },
    {
      label: t('layout.tabs.close_all'),
      key: 'close_all',
      icon: renderIcon('clarity:minus-line'),
      disabled,
    },
  ]
})

async function handleSelect(key: string) {
  switch (key) {
    case 'refresh':
      await tabStore.refreshPage()
      break
    case 'close':
      tabStore.closeTab(route, router)
      break
    case 'close_other':
      tabStore.close_otherTab(route)
      break
    case 'close_right':
      tabStore.close_rightTab(route)
      break
    case 'close_all':
      tabStore.close_allTab()
      break
  }
  showDropdown.value = false
}

function handleContextMenu(tabItem: RouteLocationNormalized) {
  return (e: MouseEvent) => {
    if (!tabItem)
      return

    e?.preventDefault()
    const index = tabStore.tabList.findIndex(tab => tab.path === tabItem.path)

    current.value = tabItem
    currentIndex.value = index

    showDropdown.value = false
    nextTick().then(() => {
      showDropdown.value = true
      x.value = e.clientX
      y.value = e.clientY
    })
  }
}

function onClickOutside() {
  showDropdown.value = false
}

function handleContext(e: MouseEvent) {
  props.tabItem && handleContextMenu(props.tabItem)(e)
}
</script>

<template>
  <span
    class="h-full flex items-center"
    :style="{
      borderLeft: !isTab ? '1px solid' : 'none',
      borderColor: themeVars.borderColor,
    }"
  >
    <div v-if="isTab">
      <div @contextmenu="handleContext">
        <span class="select-none">{{ title }}</span>
      </div>
      <NDropdown
        placement="bottom-start"
        trigger="manual"
        :show="showDropdown"
        size="small"
        :options="options"
        :x="x"
        :y="y"
        @clickoutside="onClickOutside"
        @select="handleSelect"
      />
    </div>
    <NDropdown
      v-else
      placement="bottom"
      trigger="click"
      size="small"
      :options="options"
      @clickoutside="onClickOutside"
      @select="handleSelect"
    >
      <span @click="handleContext">
        <Icon
          name="ion:chevron-down"
          class="w-8 inline-block cursor-pointer"
        />
      </span>
    </NDropdown>
  </span>
</template>
