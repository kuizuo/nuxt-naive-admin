import { computed } from 'vue'

export function useProjectSetting() {
  const projectStore = useAppStore()

  const getMenuMode = computed(() => projectStore.menuMode)

  const getTheme = computed(() => projectStore.navTheme)

  const getIsMobile = computed(() => projectStore.isMobile)

  return {
    getNavMode,
    getTheme,
  }
}
