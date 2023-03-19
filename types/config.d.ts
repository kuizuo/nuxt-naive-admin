import { MenuModeEnum } from "~~/constants/menu";

export interface HeaderSetting{
  showBreadCrumb: boolean;
  showBreadCrumbIcon: boolean;
  showTabs: boolean;
}

export interface MenuSetting {
  collapsed: boolean;
  siderHidden: boolean;
  menuWidth: number,
  mode: MenuModeEnum;
}

export interface ProjectSetting {
  headerSetting: HeaderSetting;
  menuSetting: MenuSetting;
}
