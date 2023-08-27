import type { ProjectSetting } from 'types/config'
import { MenuModeEnum } from './menu'
import { theme } from '#tailwind-config'

export const APP_PRESET_COLOR_LIST: string[] = [
  '#0960bd',
  '#0084f4',
  '#009688',
  '#536dfe',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800',
]

export const defaultSettings: ProjectSetting = {
  appSetting: {
    themeColor: theme.colors.blue[500],
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
