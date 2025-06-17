import { AlertAudienceEnum, AlertTypeEnum } from "@/enums";

// CONSTANTS
export const ALERT_TYPE_OPTIONS: { value: AlertTypeEnum; label: string }[] = [
  { value: AlertTypeEnum.CRITICAL, label: "High Risk" },
  { value: AlertTypeEnum.WARNING, label: "Warning" },
  { value: AlertTypeEnum.ALERT, label: "Alert" },
] as const;

export const ALERT_AUDIENCE_OPTIONS: {
  value: AlertAudienceEnum;
  label: string;
}[] = [
  { value: AlertAudienceEnum.ALL, label: "All Users" },
  { value: AlertAudienceEnum.STATE, label: "State" },
  { value: AlertAudienceEnum.CITY, label: "City" },
] as const;
