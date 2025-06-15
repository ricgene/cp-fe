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
    allowedRoles: [RoleEnum.ADMIN, RoleEnum.MERCHANT],
    borderedContent: false,
  },
  OFFERS_ACTIVE: {
    path: PathsEnum.OFFERS_ACTIVE,
    title: "Active Offers",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.ADMIN, RoleEnum.MERCHANT],
  },
  OFFERS_SCHEDULED: {
    path: PathsEnum.OFFERS_SCHEDULED,
    title: "Scheduled Offers",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.MERCHANT],
  },
  OFFERS_DRAFT: {
    path: PathsEnum.OFFERS_DRAFT,
    title: "Draft Offers",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.MERCHANT],
  },
  OFFERS_ARCHIVED: {
    path: PathsEnum.OFFERS_ARCHIVED,
    title: "Archived Offers",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.MERCHANT],
  },
  OFFERS_EXPIRED: {
    path: PathsEnum.OFFERS_EXPIRED,
    title: "Expired Offers",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.MERCHANT],
  },
  ALERTS: {
    path: PathsEnum.ALERTS,
    title: "Alerts",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.ADMIN],
  },
  EVENTS: {
    path: PathsEnum.EVENTS,
    title: "Events",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.ADMIN],
  },
  POINTS_ALLOCATE: {
    path: PathsEnum.POINTS_ALLOCATE,
    title: "Allocate Points",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.ADMIN],
  },
  POINTS_HISTORY: {
    path: PathsEnum.POINTS_HISTORY,
    title: "Points History",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.ADMIN],
  },
  REGISTERED_MERCHANTS: {
    path: PathsEnum.REGISTERED_MERCHANTS,
    title: "Registered Merchants",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.ADMIN],
  },
  REQUESTED_MERCHANTS: {
    path: PathsEnum.REQUESTED_MERCHANTS,
    title: "Requested Merchants",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.ADMIN],
  },
  REGISTERED_USERS: {
    path: PathsEnum.REGISTERED_USERS,
    title: "Registered Users",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.ADMIN],
  },
  OFFERS_ALL: {
    path: PathsEnum.OFFERS_ALL,
    title: "Offers",
    showSidebar: true,
    isPublic: false,
    allowedRoles: [RoleEnum.ADMIN],
  },
};

export const MERCHANT_MENU_ITEMS: IMenuItem[] = [
  {
    icon: "dashboard",
    href: ROUTES.DASHBOARD.path,
    label: ROUTES.DASHBOARD.title,
  },
  {
    label: "Offers",
    icon: "offers",
    href: PathsEnum.EMPTY,
    items: [
      { label: ROUTES.OFFERS_ACTIVE.title, href: ROUTES.OFFERS_ACTIVE.path },
      {
        label: ROUTES.OFFERS_SCHEDULED.title,
        href: ROUTES.OFFERS_SCHEDULED.path,
      },
      { label: ROUTES.OFFERS_DRAFT.title, href: ROUTES.OFFERS_DRAFT.path },
      {
        label: ROUTES.OFFERS_ARCHIVED.title,
        href: ROUTES.OFFERS_ARCHIVED.path,
      },
      { label: ROUTES.OFFERS_EXPIRED.title, href: ROUTES.OFFERS_EXPIRED.path },
    ],
  },
];

export const ADMIN_MENU_ITEMS: IMenuItem[] = [
  {
    icon: "dashboard",
    href: ROUTES.DASHBOARD.path,
    label: ROUTES.DASHBOARD.title,
  },
  {
    icon: "merchants",
    label: "Merchants",
    href: PathsEnum.EMPTY,
    items: [
      {
        label: ROUTES.REQUESTED_MERCHANTS.title,
        href: ROUTES.REQUESTED_MERCHANTS.path,
      },
      {
        label: ROUTES.REGISTERED_MERCHANTS.title,
        href: ROUTES.REGISTERED_MERCHANTS.path,
      },
    ],
  },
  {
    icon: "users",
    href: ROUTES.REGISTERED_USERS.path,
    label: ROUTES.REGISTERED_USERS.title,
  },
  {
    icon: "alerts",
    label: ROUTES.ALERTS.title,
    href: ROUTES.ALERTS.path,
  },
  {
    icon: "events",
    label: ROUTES.EVENTS.title,
    href: ROUTES.EVENTS.path,
  },
  {
    icon: "offers",
    label: "Offers",
    href: ROUTES.OFFERS_ALL.path,
  },
  {
    icon: "points",
    label: "Points",
    href: PathsEnum.EMPTY,
    items: [
      {
        label: ROUTES.POINTS_HISTORY.title,
        href: ROUTES.POINTS_HISTORY.path,
      },
      {
        label: ROUTES.POINTS_ALLOCATE.title,
        href: ROUTES.POINTS_ALLOCATE.path,
      },
    ],
  },
];

export const DISABLED_MENU_ITEMS: IMenuItem[] = [
  {
    disabled: true,
    icon: "dashboard",
    href: ROUTES.DASHBOARD.path,
    label: ROUTES.DASHBOARD.title,
  },
  {
    disabled: true,
    icon: "offers",
    label: "Offers",
    href: ROUTES.OFFERS_ACTIVE.path,
  },
];

export const PUBLIC_ROUTES = Object.values(ROUTES)
  .filter((route) => route.isPublic)
  .map((route) => route.path);
