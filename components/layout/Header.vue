<script lang="ts" setup>
import { useThemeVars } from 'naive-ui'
import Search from './components/Search.vue'
import Fullscreen from './components/Fullscreen.vue'
import ThemeSetting from './components/ThemeSetting.vue'

const route = useRoute()
const router = useRouter()
const themeVars = useThemeVars()

const { isMobile } = useDevice()
const { showLogo } = useAppSetting()
const { collapsed, toggleCollapsed, menuMode } = useMenuSetting()
const { headerSetting } = useHeaderSetting()
const { t } = useI18n()

const getShowHeaderLogo = computed(() => {
  return !isMobile.value && !menuMode && showLogo.value
})

function generator(routerMap: any[]) {
  return routerMap.map((item: any) => {
    const currentMenu = {
      ...item,
      label: item.meta?.title && t(item.meta?.title),
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

function dropdownSelect(key: string) {
  router.push({ path: key })
}
</script>

<template>
  <div
    class="p-2 pr-4 z-40 w-full h-12 flex justify-center items-center backdrop-filter backdrop-blur-md border-b"
    :style="{ borderColor: themeVars.borderColor }"
  >
    <AppLogo v-if="getShowHeaderLogo || isMobile" :show-title="!isMobile" class="mr-2" />
    <div class="flex justify-center items-center gap-2">
      <div class="ml-1 cursor-pointer inline-flex justify-center items-center" @click="toggleCollapsed">
        <Icon :name="collapsed ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'" />
      </div>
      <NBreadcrumb v-if="headerSetting.showBreadCrumb" class="inline-flex">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name">
          <NBreadcrumbItem v-if="routeItem.meta.title">
            <NDropdown v-if="routeItem.children?.length" :options="routeItem.children" @select="dropdownSelect">
              <span class="inline-flex items-end gap-2">
                <Icon
                  v-if="headerSetting.showBreadCrumbIcon && routeItem.meta.icon" :name="routeItem.meta.icon"
                  size="20px"
                />
                {{ $t(routeItem.meta.title) }}
              </span>
            </NDropdown>
            <span v-else class="inline-flex items-end gap-2">
              <Icon
                v-if="headerSetting.showBreadCrumbIcon && routeItem.meta.icon" :name="routeItem.meta.icon"
                size="20px"
              />
              {{ $t(routeItem.meta.title) }}
            </span>
          </NBreadcrumbItem>
        </template>
      </NBreadcrumb>
    </div>

    <div class="flex-auto" />
    <div class="flex justify-center items-center">
      <div class="flex items-center gap-4">
        <Search />
        <Fullscreen />
        <AppLocalePicker />
        <UserButton />
        <ThemeSetting />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.n-breadcrumb) {
  .n-breadcrumb-item .n-breadcrumb-item__link {
    padding: 0;
  }
}
</style>
