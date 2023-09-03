export function useAppSetting() {
  const settings = useSettingsStore()

  const showFooter = computed(() => settings.appSetting.showFooter)

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
    showFooter,
    showLogo,
    themeColor,
    setThemeColor,
  }
}
