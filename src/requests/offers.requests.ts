import { api } from "@/libs";
import {
  IOffer,
  OfferStatusType,
  IMetaResponse,
  OfferSpecialFilterType,
  DurationFilterType,
} from "@/types";
// REQUEST INTERFACES
export interface CreateOfferRequest {
  name: string;
  productName: string;
  productCategory: string;
  description: string;
  startDate: string;
  endDate: string;
  isPerk: boolean;
  offerType: string;
  discountRate?: number;
  pointsPerPurchase?: number;
  image: FileList;
  status: OfferStatusType;
}

// ENDPOINT URLS
const createOfferUrl = "/offers";
const getAllOffersUrl = "/offers";
const getOfferByIdUrl = "/offers"; // use with /:id
const updateOfferUrl = "/offers"; // use with /:id
const deleteOfferUrl = "/offers"; // use with /:id
const publishOfferUrl = (id: number) => `/offers/${id}/publish`;

interface GetAllOffersParams {
  status: OfferStatusType;
  page?: number;
  limit?: number;
  search?: string;
  filter?: DurationFilterType;
  specialFilter?: OfferSpecialFilterType;
}

interface IAllOffersResponse {
  offers: IOffer[];
  meta: IMetaResponse;
}

// REQUESTS
export const createOffer = async (data: FormData) => {
  return await api.post(createOfferUrl, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllOffers = async (params: GetAllOffersParams) => {
  return await api.get<IAllOffersResponse>(getAllOffersUrl, { params });
};

export const changeOfferStatus = (id: number, status: OfferStatusType) =>
  api.patch(`${updateOfferUrl}/${id}`, { status });

export const getOfferById = (id: number) => api.get(`${getOfferByIdUrl}/${id}`);

export const updateOffer = (id: number, data: FormData) =>
  api.patch(`${updateOfferUrl}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteOffer = (id: number) =>
  api.delete(`${deleteOfferUrl}/${id}`);

export const publishOffer = (id: number) => api.post(publishOfferUrl(id));
