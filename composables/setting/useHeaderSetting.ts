export function useHeaderSetting() {
  const settings = useSettingsStore()

  const showBreadCrumb = computed(() => settings.headerSetting.showBreadCrumb)

  const showBreadCrumbIcon = computed(() => settings.headerSetting.showBreadCrumbIcon)

  return {
    showBreadCrumb,
    showBreadCrumbIcon,
  }
}
