import { RoleType } from "@/types";
import { ICONS_LIST } from "@/Icons/resolver";
import { PathsEnum } from "@/enums";

// TYPES
export type IconsType = keyof typeof ICONS_LIST;
export type PathsType = (typeof PathsEnum)[keyof typeof PathsEnum];

// INTERFACES
export interface IMenuItem {
  label: string;
  icon: IconsType;
  href: PathsType;
  items?: { label: string; href: PathsType }[];
}

export interface IRouteConfig {
  path: PathsType;
  title: string;
  showSidebar: boolean;
  borderedContent?: boolean;
  isPublic: boolean;
  allowedRoles: RoleType[];
}
