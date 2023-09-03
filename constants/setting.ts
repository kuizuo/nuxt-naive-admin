import { MenuModeEnum } from './menu'
import { theme } from '#tailwind-config'

export interface AppSetting {
  themeColor: string
  showLogo: boolean
  showFooter: boolean
}

export interface HeaderSetting {
  showBreadCrumb: boolean
  showBreadCrumbIcon: boolean
  showTabs: boolean
}

export interface MenuSetting {
  collapsed: boolean
  siderHidden: boolean
  menuWidth: number
  mode: MenuModeEnum
  type: 'light' | 'dark'
}

export interface ProjectSetting {
  appSetting: AppSetting
  headerSetting: HeaderSetting
  menuSetting: MenuSetting
}

export const defaultSettings: ProjectSetting = {
  appSetting: {
    themeColor: theme.colors.emerald[500],
    showLogo: true,
    showFooter: false,
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
