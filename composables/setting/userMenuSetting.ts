import { useSettingsStore } from '~~/stores/settings'

import type { MenuSetting } from '~~/types/config'

export function useMenuSetting() {
  const settingsStore = useSettingsStore()

  const collapsed = computed(() => settingsStore.menuSetting.collapsed)

  const menuType = computed(() => settingsStore.menuSetting.type)

  const menuMode = computed(() => settingsStore.menuSetting.mode)

  const menuWidth = computed(() => settingsStore.menuSetting.menuWidth)

  const menuSetting = computed(() => settingsStore.menuSetting)

  // Set menu configuration
  function setMenuSetting(menuSetting: DeepPartial<MenuSetting>): void {
    settingsStore.setSetting({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(collapsed),
    })
  }

  function setMenuType(type: MenuType['type']) {
    setMenuSetting({ type })
  }

  return {
    setMenuSetting,
    toggleCollapsed,
    setMenuType,
    menuType,
    menuMode,
    collapsed,
    menuWidth,
    menuSetting,
  }
}
