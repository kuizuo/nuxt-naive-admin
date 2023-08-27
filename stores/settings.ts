import { defaultSettings } from '~~/constants/theme'
import type { ProjectSetting } from '~~/types/config'

export const useSettingsStore = defineStore('app-settings', {
  state: (): ProjectSetting => defaultSettings,
  actions: {
    setSetting(setting: DeepPartial<ProjectSetting>): void {
      this.$state = deepMerge(this.$state || {}, setting)
    },
  },
  persist: {
    key: 'app-settings',
  },
})
