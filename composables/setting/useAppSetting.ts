export function useAppSetting() {
  const settings = useSettingsStore()

  const showLogo = computed(() => settings.appSetting.showLogo)

  const themeColor = computed(() => settings.appSetting.themeColor)

  function setThemeColor(color: string): void {
    settings.setSetting({
      appSetting: {
        themeColor: color,
      },
    })
  }

  return {
    showLogo,
    themeColor,
    setThemeColor,
  }
}
