<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import { Icon } from '#components'

const emit = defineEmits(['update:collapsed', 'clickMenuItem'])

const route = useRoute()
const router = useRouter()
const { collapsed } = useMenuSetting()
const menus = ref<MenuOption[]>([])
const matched = route.matched
const selectedKey = ref<string>(route.path as string)
const openKeys = ref(matched && matched.length ? matched.map(item => item.path) : [])

const color = useColorMode()
const inverted = computed(() => color.value === 'dark')

function buildMenuList(routes: Readonly<RouteRecordRaw[]>, parentPath = ''): MenuOption[] {
  const menuList: MenuOption[] = []

  routes
    .filter(route => route.meta?.layout === 'admin')
    .filter(route => !route.meta?.hideMenu)
    .sort((a, b) => a.meta!.order as number - (b.meta!.order as number))
    .forEach((route) => {
      const { meta, path, children, name } = route
      const { title, icon } = meta!

      const menu: MenuOption = {
        label: title,
        key: path.startsWith('http') ? path : `${parentPath}${parentPath ? '/' : ''}${path}`,
        name,
        icon: renderIcon(icon!),
      }

      if (children && children.length > 0)
        menu.children = buildMenuList(children, menu.key as string)

      menuList.push(menu)
    })

  return menuList
}

menus.value = buildMenuList(router.options.routes) as any
function renderIcon(icon: string) {
  return () => h(Icon, { name: icon })
}

function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key))
    window.open(key)
  else
    router.push({ path: key })

  emit('clickMenuItem', key)
}

function updateSelectedKey() {
  const matched = route.matched
  openKeys.value = matched.map(item => item.path)
  selectedKey.value = route.path
}

function menuExpanded(keys: string[]) {
  if (!keys)
    return

  function findChildrenLen(key: string) {
    if (!key)
      return false
    const subRouteChildren: string[] = []
    for (const { children, key } of unref(menus)) {
      if (children && children.length)
        subRouteChildren.push(key as string)
    }
    return subRouteChildren.includes(key)
  }

  const latestOpenKey = keys.find(key => !openKeys.value.includes(key))
  const isExistChildren = findChildrenLen(latestOpenKey as string)
  openKeys.value = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : keys
}

function updateMenu() {
  updateSelectedKey()
}

watch(
  () => route.fullPath,
  () => {
    updateMenu()
  },
)

onMounted(() => {
  updateMenu()
})
</script>

<template>
  <n-menu
    ref="menuInstRef"
    mode="vertical"
    :options="menus"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :inverted="inverted"
    :expanded-keys="openKeys"
    :value="selectedKey"
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
  />
</template>

<style scoped></style>
