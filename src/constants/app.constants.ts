import { PathsEnum, RoleEnum } from "@/enums";
import { IMenuItem, IRouteConfig } from "@/types";

// APP CONFIGURATION
export const ACCESS_COOKIE_NAME = "cp.access";
export const REFRESH_COOKIE_NAME = "cp.refresh";
export const CACHE_REVALIDATION_TIME_FOR_STATIC_DATA = 60 * 60 * 1; // 1 hour

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// CONSTANTS
export const ROUTES: Record<
  Exclude<keyof typeof PathsEnum, "EMPTY">,
  IRouteConfig
> = {
  LANDING: {
    path: PathsEnum.LANDING,
    title: "Landing",
    showSidebar: false,
    borderedContent: false,
    isPublic: true,
    allowedRoles: [],
  },
  LOGIN: {
    path: PathsEnum.LOGIN,
    title: "Login",
    showSidebar: false,
    borderedContent: false,
    isPublic: true,
    allowedRoles: [],
  },
  REGISTER: {
    path: PathsEnum.REGISTER,
    title: "Register",
    showSidebar: false,
    borderedContent: false,
    isPublic: true,
    allowedRoles: [],
  },
  FORGOT_PASSWORD: {
    path: PathsEnum.FORGOT_PASSWORD,
    title: "Forgot Password",
    showSidebar: false,
    isPublic: true,
    allowedRoles: [],
  },
  RESET_PASSWORD: {
    path: PathsEnum.RESET_PASSWORD,
    title: "Reset Password",
    showSidebar: false,
    isPublic: true,
    allowedRoles: [],
  },
  DASHBOARD: {
    path: PathsEnum.DASHBOARD,
    title: "Dashboard",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.RESIDENT, RoleEnum.MERCHANT],
    borderedContent: false,
  },
  OFFERS_ACTIVE: {
    path: PathsEnum.OFFERS_ACTIVE,
    title: "Active Offers",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.RESIDENT, RoleEnum.MERCHANT],
  },
  OFFERS_SCHEDULED: {
    path: PathsEnum.OFFERS_SCHEDULED,
    title: "Scheduled Offers",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.RESIDENT, RoleEnum.MERCHANT],
  },
  OFFERS_DRAFT: {
    path: PathsEnum.OFFERS_DRAFT,
    title: "Draft Offers",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.RESIDENT, RoleEnum.MERCHANT],
  },
  OFFERS_ARCHIVED: {
    path: PathsEnum.OFFERS_ARCHIVED,
    title: "Archived Offers",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.RESIDENT, RoleEnum.MERCHANT],
  },
  OFFERS_EXPIRED: {
    path: PathsEnum.OFFERS_EXPIRED,
    title: "Expired Offers",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.RESIDENT, RoleEnum.MERCHANT],
  },
};

export const MENU_ITEMS: IMenuItem[] = [
  { label: "Dashboard", icon: "dashboard", href: PathsEnum.DASHBOARD },
  {
    label: "Offers",
    icon: "offers",
    href: PathsEnum.EMPTY,
    items: [
      { label: "Active Offers", href: PathsEnum.OFFERS_ACTIVE },
      { label: "Scheduled Offers", href: PathsEnum.OFFERS_SCHEDULED },
      { label: "Draft Offers", href: PathsEnum.OFFERS_DRAFT },
      { label: "Archived Offers", href: PathsEnum.OFFERS_ARCHIVED },
      { label: "Expired Offers", href: PathsEnum.OFFERS_EXPIRED },
    ],
  },
];
