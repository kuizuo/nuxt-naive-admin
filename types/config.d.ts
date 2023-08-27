import { MenuModeEnum } from "~~/constants/menu";

export interface AppSetting {
  themeColor: string;
}

export interface HeaderSetting {
  showBreadCrumb: boolean
  showBreadCrumbIcon: boolean
  showTabs: boolean;
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
