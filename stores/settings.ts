import type { ProjectSetting } from '~~/constants/setting'
import { defaultSettings } from '~~/constants/setting'

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
