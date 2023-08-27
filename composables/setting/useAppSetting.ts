export function useAppSetting() {
  const settings = useSettingsStore()

  const themeColor = computed(() => settings.appSetting.themeColor)

  function setThemeColor(color: string): void {
    settings.setSetting({
      appSetting: {
        themeColor: color,
      },
    })
  }

  return {
    themeColor,
    setThemeColor,
  }
}
