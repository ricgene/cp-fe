import { IMedia } from "./misc.types";
import {
  OfferActionEnum,
  OfferStatusEnum,
  OfferSpecialFilterEnum,
} from "@/enums";

// TYPES
export type OfferStatusType =
  (typeof OfferStatusEnum)[keyof typeof OfferStatusEnum];

export type OfferSpecialFilterType =
  (typeof OfferSpecialFilterEnum)[keyof typeof OfferSpecialFilterEnum];

export type OfferActionType =
  (typeof OfferActionEnum)[keyof typeof OfferActionEnum];

// INTERFACES
export interface IOffer {
  id: number;
  image: IMedia;
  name: string;
  isPerk: boolean;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  offerType: string;
  merchantId: number;
  redeemToken: string;
  productName: string;
  description: string;
  discountRate: number;
  productCategory: string;
  pointsPerPurchase: number;
  status: OfferStatusType; // offer status
}

export interface IAction {
  key: OfferActionType;
  label: string;
}

export interface IKeyLabelPair {
  key: string;
  label: string;
}

export interface ITableData {
  id: number | string;
  isPerk?: boolean;
  [key: string]: string | number | boolean | undefined;
}
