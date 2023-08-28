export function useHeaderSetting() {
  const settings = useSettingsStore()

  const headerSetting = computed(() => settings.headerSetting)

  const showTabs = computed(() => settings.headerSetting.showTabs)

  return {
    headerSetting,
    showTabs,
  }
}
