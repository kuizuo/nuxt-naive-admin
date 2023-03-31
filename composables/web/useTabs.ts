import type { RouteLocationNormalized, Router } from 'vue-router'

export function useTabs(_router?: Router) {
  const { headerSetting } = useHeaderSetting()

  function canIUseTabs(): boolean {
    const { showTabs } = headerSetting.value
    if (!showTabs)
      throw new Error('The multi-tab page is currently not open, please open it in the settings！')

    return !!showTabs
  }

  const tabStore = useTabStore()
  const router = _router || useRouter()

  const { currentRoute } = router

  function getCurrentTab() {
    const route = unref(currentRoute)
    return tabStore.tabList.find(item => item.fullPath === route.fullPath)!
  }

  async function updateTabTitle(title: string, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs
    if (!canIUse)
      return

    const targetTab = tab || getCurrentTab()
    await tabStore.setTabTitle(title, targetTab)
  }

  async function updateTabPath(path: string, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs
    if (!canIUse)
      return

    const targetTab = tab || getCurrentTab()
    await tabStore.updateTabPath(path, targetTab)
  }

  return {
    setTitle: (title: string, tab?: RouteLocationNormalized) => updateTabTitle(title, tab),
    updatePath: (fullPath: string, tab?: RouteLocationNormalized) => updateTabPath(fullPath, tab),
  }
}
