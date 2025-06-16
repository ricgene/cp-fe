import { OfferStatusEnum, ActionEnum } from "@/enums";

// CONSTANTS
export const OFFER_ACTIONS: Record<
  Exclude<OfferStatusEnum, "DELETED">,
  { key: ActionEnum; label: string }[]
> = {
  ACTIVE: [
    { key: ActionEnum.QR_CODE, label: "Show QR code" },
    { key: ActionEnum.ARCHIVE, label: "Archive Offer" },
  ],
  SCHEDULED: [
    { key: ActionEnum.EDIT, label: "Edit Offer" },
    { key: ActionEnum.PUBLISH, label: "Publish Offer" },
    { key: ActionEnum.ARCHIVE, label: "Archive Offer" },
  ],
  DRAFT: [
    { key: ActionEnum.EDIT, label: "Edit Offer" },
    { key: ActionEnum.PUBLISH, label: "Publish Offer" },
    { key: ActionEnum.ARCHIVE, label: "Archive Offer" },
  ],
  EXPIRED: [{ key: ActionEnum.DELETE, label: "Delete Offer" }],
  ARCHIVED: [],
} as const;
