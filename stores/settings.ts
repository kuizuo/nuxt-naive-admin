import { MenuModeEnum } from '~~/constants/menu'
import type { ProjectSetting } from '~~/types/config'

export const defaultSettings: ProjectSetting = {
  headerSetting: {
    showBreadCrumb: true,
    showBreadCrumbIcon: false,
    showTabs: true,
  },
  menuSetting: {
    collapsed: false,
    mode: MenuModeEnum.VERTICAL,
    menuWidth: 200,
    siderHidden: false,
  },

}

export const useSettingsStore = defineStore('app-settings', {
  state: (): ProjectSetting => defaultSettings,
  actions: {
    setSetting(setting: ProjectSetting): void {
      this.$state = deepMerge(this.$state || {}, setting)
    },

  },
  persist: {
    key: 'app-settings',
  },
})
