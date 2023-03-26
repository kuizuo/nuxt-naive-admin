<script setup lang="tsx">
import type { RouteLocationNormalized } from 'vue-router'
import { Icon } from '#components'

const props = defineProps<{
  tabItem: RouteLocationNormalized
  isTab?: boolean
}>()

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
  return meta && meta.title
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

  const closeRightDisabled
      = !isCurItem || (index === tabStore.tabList.length - 1)

  return [
    {
      label: '刷新标签页',
      key: 'refresh',
      icon: renderIcon('ion:reload-sharp'),
      disabled: refreshDisabled,
    },
    {
      label: '关闭标签页',
      key: 'close',
      icon: renderIcon('clarity:close-line'),
      disabled: !!meta?.affix || disabled,
    },
    {
      label: '关闭其他标签页',
      key: 'closeOther',
      icon: renderIcon('dashicons:align-center'),
      disabled,
    },
    {
      label: '关闭右侧标签页',
      key: 'closeRight',
      icon: renderIcon('ant-design:right-square-outlined'),
      disabled: closeRightDisabled,
    },
    {
      label: '关闭全部标签页',
      key: 'closeAll',
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
    case 'closeOther':
      tabStore.closeOtherTab(route)
      break
    case 'closeRight':
      tabStore.closeRightTab(route)
      break
    case 'closeAll':
      tabStore.closeAllTab()
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
  <span class="h-full flex items-center border-l-1 border-[var(--n-border-color)]">
    <div v-if="isTab">
      <div @contextmenu="handleContext">
        <span class="select-none">{{ title }}</span>
      </div>
      <n-dropdown
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
    <n-dropdown
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
    </n-dropdown>
  </span>
</template>
