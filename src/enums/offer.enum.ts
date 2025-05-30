// ENUMS
export enum OfferStatusEnum {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  SCHEDULED = "SCHEDULED",
  ARCHIVED = "ARCHIVED",
  EXPIRED = "EXPIRED",
  DELETED = "DELETED",
}

export enum OfferActionEnum {
  EDIT = "EDIT",
  PUBLISH = "PUBLISH",
  ARCHIVE = "ARCHIVE",
  DELETE = "DELETE",
  QR_CODE = "QR_CODE",
}

export enum OfferDurationFilterEnum {
  ALL = "ALL",
  TODAY = "TODAY",
  TOMORROW = "TOMORROW",
  THIS_WEEK = "THIS_WEEK",
  THIS_MONTH = "THIS_MONTH",
}

export enum OfferSpecialFilterEnum {
  ALL = "ALL",
  EXCLUSIVELY_FOR_YOU = "EXCLUSIVELY_FOR_YOU",
}
