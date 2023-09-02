<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'
import { useThemeVars } from 'naive-ui'

const emit = defineEmits(['update:collapsed', 'clickMenuItem'])

const themeVars = useThemeVars()
const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const { collapsed, menuType } = useMenuSetting()

const menus = ref<MenuOption[]>([])
const matched = route.matched
const selectedKey = ref<string>(route.path as string)
const openKeys = ref(matched && matched.length ? matched.map(item => item.path) : [])

const colorMode = useColorMode()
const inverted = computed(() => colorMode.value === 'dark')

const color = computed(() => {
  const theme = unref(themeVars)

  return {
    'text': menuType.value === 'dark' && '#d4d4d8',
    'text-hover': menuType.value === 'dark' ? '#fff' : theme.primaryColor,
    'bg-hover': menuType.value === 'dark' ? theme.primaryColor : theme.hoverColor,
    'text-active': menuType.value === 'dark' ? '#fff' : theme.primaryColor,
    'text-active-hover': menuType.value === 'dark' ? '#fff' : theme.primaryColor,
  }
})

function genMenus() {
  menus.value = buildMenuList(router.options.routes) as any
}
genMenus()

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
  nextTick(() => {
    updateMenu()
  })
})

watch(locale, () => {
  genMenus()
})
</script>

<template>
  <NMenu
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

<style lang="scss" scoped>
:deep(.n-menu-item-content) {
  --n-item-color-hover: v-bind('color["bg-hover"]');
  --n-item-icon-color-hover: v-bind('color["text-hover"]');
  --n-item-text-color-hover: v-bind('color["text-hover"]');

  --n-item-color-active: v-bind('color["bg-hover"]');
  --n-item-color-active-hover: v-bind('color["bg-hover"]');

  .n-menu-item-content__icon {
    --n-item-icon-color: v-bind('color.text');
    --n-item-icon-color-collapsed: v-bind('color.text');
    --n-item-icon-color-active: v-bind('color["text-active"]');
    --n-item-icon-color-active-hover: v-bind('color["text-active-hover"]');
  }

  .n-menu-item-content-header {
    --n-item-text-color: v-bind('color.text');
    --n-item-text-color-active: v-bind('color["text-active"]');
    --n-item-text-color-active-hover: v-bind('color["text-active-hover"]');
  }

  .n-menu-item-content__arrow {
    --n-arrow-color: v-bind('color.text');
    --n-arrow-color-hover: v-bind('color.text');
  }
}
</style>
