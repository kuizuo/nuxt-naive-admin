import { useSettingsStore } from '~~/stores/settings'

import type { MenuSetting } from '~~/types/config'

export function useMenuSetting() {
  const settingsStore = useSettingsStore()

  const collapsed = computed(() => settingsStore.menuSetting.collapsed)

  const menuType = computed(() => settingsStore.menuSetting.type)

  const menuMode = computed(() => settingsStore.menuSetting.mode)

  const showMenu = computed(() => settingsStore.menuSetting.show)

  const menuWidth = computed(() => settingsStore.menuSetting.menuWidth)

  const menuSetting = computed(() => settingsStore.menuSetting)

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    settingsStore.setSetting({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(collapsed),
    })
  }

  return {
    setMenuSetting,

    toggleCollapsed,
    menuType,
    menuMode,
    showMenu,
    collapsed,
    menuWidth,
    menuSetting,
  }
}
