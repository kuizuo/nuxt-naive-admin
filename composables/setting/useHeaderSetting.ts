export function useHeaderSetting() {
  const settings = useSettingsStore()

  const headerSetting = computed(() => settings.headerSetting)

  return {
    headerSetting,
  }
}
