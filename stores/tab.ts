import type { RouteLocationNormalized, RouteRecordNormalized, Router } from 'vue-router'

// 不需要出现在标签页中的路由
const whiteList = ['Redirect']

export interface ITabsState {
  tabList: RouteLocationNormalized[]
  refreshing: boolean
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route)
    return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map(item => ({
        meta: item.meta,
        name: item.name,
        path: item.path,
      }))
      : undefined) as RouteRecordNormalized[],
  }
}

export const useTabStore = defineStore({
  id: 'app-tab',
  state: (): ITabsState => ({
    tabList: [],
    refreshing: false,
  }),
  actions: {
    async refreshPage() {
      // const router = useRouter()
      // router.replace({
      //   path: `/redirect${router.currentRoute.value.fullPath}`,
      // })
      this.refreshing = true
      setTimeout(() => {
        this.refreshing = false
      }, 500)
    },
    setTabList(tabList: RouteLocationNormalized[]) {
      this.tabList = tabList
    },
    addTab(route: RouteLocationNormalized) {
      const rawRoute = getRawRoute(route)
      const { name, fullPath, path, meta } = rawRoute
      if (whiteList.includes(name as string))
        return

      if (meta?.layout !== 'admin')
        return

      const tabHasExits = this.tabList.some((tab, index) => {
        return (tab.fullPath || tab.path) === (fullPath || path)
      })

      if (!tabHasExits && rawRoute)
        this.tabList.push(rawRoute)
    },
    closeLeftTab(route: RouteLocationNormalized) {
      const index = this.tabList.findIndex(item => item.fullPath === route.fullPath)
      this.tabList = this.tabList.filter((item, i) => i >= index || (item?.meta?.affix ?? false))
    },
    close_rightTab(route: RouteLocationNormalized) {
      const index = this.tabList.findIndex(item => item.fullPath === route.fullPath)
      this.tabList = this.tabList.filter((item, i) => i <= index || (item?.meta?.affix ?? false))
    },
    close_otherTab(route: RouteLocationNormalized) {
      this.tabList = this.tabList.filter(item => item.fullPath === route.fullPath || (item?.meta?.affix ?? false))
    },
    async closeTab(route: RouteLocationNormalized, router: Router) {
      const close = (route: RouteLocationNormalized) => {
        const { fullPath, meta: { affix } = {} } = route
        if (affix)
          return

        const index = this.tabList.findIndex(item => item.fullPath === fullPath)
        index !== -1 && this.tabList.splice(index, 1)
      }

      const { currentRoute, replace } = router

      const { path } = unref(currentRoute)

      if (path !== route.path) {
        close(unref(route))
        return
      }

      close(currentRoute.value)
      const toTarget = this.tabList[Math.max(0, this.tabList.length - 1)]
      await replace(toTarget)
    },
    close_allTab() {
      this.tabList = this.tabList.filter(item => item?.meta?.affix ?? false)
    },

    async sortTabs(oldIndex: number, newIndex: number) {
      const currentTab = this.tabList[oldIndex]
      this.tabList.splice(oldIndex, 1)
      this.tabList.splice(newIndex, 0, currentTab)
    },

    async setTabTitle(title: string, route: RouteLocationNormalized) {
      const findTab = this.tabList.find(item => item === route)
      if (findTab)
        findTab.meta.title = title
    },

    async updateTabPath(fullPath: string, route: RouteLocationNormalized) {
      const findTab = this.tabList.find(item => item === route)
      if (findTab) {
        findTab.fullPath = fullPath
        findTab.path = fullPath
      }
    },
  },
  persist: {
    key: 'app-tabs',
  },
})
