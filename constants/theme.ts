import type { ProjectSetting } from 'types/config'
import { MenuModeEnum } from './menu'
import { theme } from '#tailwind-config'

export const defaultSettings: ProjectSetting = {
  appSetting: {
    themeColor: theme.colors.emerald[500],
    showLogo: true,
  },
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
    type: 'dark',
  },
}
