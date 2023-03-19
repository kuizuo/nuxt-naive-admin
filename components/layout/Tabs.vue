<script lang="ts" setup>
import { useSortable } from '@vueuse/integrations/useSortable'

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()

const activeKey = ref<string>('')

const tabList = computed(() => tabStore.tabList)

useSortable('.n-tabs-wrapper', tabStore.tabList, {
  animation: 300,
  delay: 400,
  delayOnTouchOnly: true,
})

function handleClose(fullPath: string) {
  const tab = tabList.value.find(item => item.fullPath === fullPath)
  tabStore.closeTab(tab!, router)
}

const handleUpdateValue = (fullPath: string) => {
  const tab = tabList.value.find(item => item.fullPath === fullPath)
  if (tab)
    router.push(tab.fullPath)

  activeKey.value = fullPath
}

watch(
  () => route.fullPath,
  (to) => {
    activeKey.value = to
    tabStore.addTab(unref(route))
  },
  { immediate: true },
)

function updateTabPad() {
  const wrappers = document.querySelectorAll('.n-tabs-tab-wrapper')

  wrappers.forEach((wrapper) => {
    if (!wrapper?.children?.[0].className.includes('n-tabs-tab-pad')) {
      const pad = document.createElement('div')
      pad.className = 'n-tabs-tab-pad'
      wrapper.insertBefore(pad, wrapper.children[0])
    }
  })
}

onMounted(() => {
  updateTabPad()
})
</script>

<template>
  <div>
    <n-tabs
      v-model:value="activeKey"
      type="card"
      size="small"
      tab-style="min-width: 60px;"
      @update:value="handleUpdateValue"
      @close="handleClose"
    >
      <n-tab
        v-for="item in tabList" :key="item.query ? item.fullPath : item.path"
        :name="item.fullPath"
        :closable="!(item && item.meta && item.meta.affix)"
      >
        <TabContent :tab-item="item" is-tab />
      </n-tab>
      <template #suffix>
        <TabRedo />
        <TabContent :tab-item="$route" />
      </template>
    </n-tabs>
  </div>
</template>

<style scoped>
:deep(.n-tabs){
  padding-top: 2px;
}
</style>
