import { OfferStatusEnum, OfferActionEnum } from "@/enums";
import { IOffer } from "@/types";

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

// (don't change the order of the columns)
export const OFFER_TABLE_COLUMNS: {
  key: keyof IOffer | "type";
  label: string;
}[] = [
  { key: "name", label: "Offer Name" },
  { key: "productName", label: "Product" },
  { key: "productCategory", label: "Category" },
  { key: "description", label: "Description" },
  { key: "type", label: "Type" },
  { key: "offerType", label: "Offer Type" },
  { key: "discountRate", label: "Discount" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "pointsPerPurchase", label: "Points per purchase" },
  { key: "image", label: "Image" },
  // { key: "status", label: "Status" },
];
