import { OfferStatusEnum, OfferActionEnum } from "@/enums";

// CONSTANTS
export const OFFER_ACTIONS: Record<
  Exclude<OfferStatusEnum, "DELETED">,
  { key: OfferActionEnum; label: string }[]
> = {
  ACTIVE: [
    { key: OfferActionEnum.QR_CODE, label: "Show QR code" },
    { key: OfferActionEnum.ARCHIVE, label: "Archive Offer" },
  ],
  SCHEDULED: [
    { key: OfferActionEnum.EDIT, label: "Edit Offer" },
    { key: OfferActionEnum.PUBLISH, label: "Publish Offer" },
    { key: OfferActionEnum.ARCHIVE, label: "Archive Offer" },
  ],
  DRAFT: [
    { key: OfferActionEnum.EDIT, label: "Edit Offer" },
    { key: OfferActionEnum.PUBLISH, label: "Publish Offer" },
    { key: OfferActionEnum.ARCHIVE, label: "Archive Offer" },
  ],
  EXPIRED: [{ key: OfferActionEnum.DELETE, label: "Delete Offer" }],
  ARCHIVED: [],
} as const;
