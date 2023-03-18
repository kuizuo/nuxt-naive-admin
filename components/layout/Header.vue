<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

const { isMobile } = useDevice()
const { collapsed, toggleCollapsed, menuMode } = useMenuSetting()
const { headerSetting } = useHeaderSetting()

const getShowHeaderLogo = computed(() => {
  return !isMobile.value && !menuMode
})

const generator = (routerMap: any[]) => {
  return routerMap.map((item: any) => {
    const currentMenu = {
      ...item,
      label: item.meta.title,
      key: item.name,
    }

    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0)
      currentMenu.children = generator(item.children)

    if (currentMenu.children && currentMenu.children.length === 0)
      delete currentMenu.children

    return currentMenu
  })
}

const breadcrumbList = computed(() => generator(route.matched))

const dropdownSelect = (key: string) => {
  router.push({ name: key })
}
</script>

<template>
  <div
    class="p-2 z-40 w-full h-12 flex justify-center items-center backdrop-filter backdrop-blur-md border-b-1 border-[var(--n-border-color)]"
  >
    <AppLogo v-if="getShowHeaderLogo || isMobile" :show-title="!isMobile" class="mr-2" />
    <div class="layout-header-left flex justify-center items-center gap-2">
      <div class="ml-1 cursor-pointer flex justify-center items-center" @click="toggleCollapsed">
        <Icon v-if="collapsed" name="ant-design:menu-unfold-outlined" size="20" />
        <Icon v-else name="ant-design:menu-fold-outlined" size="20" />
      </div>
      <n-breadcrumb v-if="headerSetting.showBreadCrumb">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name">
          <n-breadcrumb-item v-if="routeItem.meta.title">
            <n-dropdown
              v-if="routeItem.children?.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span>
                <Icon
                  v-if="headerSetting.showBreadCrumbIcon && routeItem.meta.icon"
                  :name="routeItem.meta.icon"
                />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span v-else>
              <Icon
                v-if="headerSetting.showBreadCrumbIcon && routeItem.meta.icon"
                :name="routeItem.meta.icon"
              />
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>

    <div flex="auto" />
    <div class="layout-header-right flex justify-center items-center">
      <!-- 个人中心 -->
      <div class="flex items-center gap-4">
        <Fullscreen />
        <AppDarkToggle />
        <UserDropdown />
      </div>
    </div>
  </div>
</template>
