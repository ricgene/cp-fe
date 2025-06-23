import { DurationFilterEnum, SortByEnum } from "@/enums";

// TYPES
export type SortByType = keyof typeof SortByEnum;
export type DurationFilterType =
  (typeof DurationFilterEnum)[keyof typeof DurationFilterEnum];

// INTERFACES
export interface IMedia {
  url: string;
  previewUrl: string;
}

export interface IState {
  name: string;
  cities: string[];
}

export interface IAddress {
  id: number;
  city: string;
  state: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface IStaticData {
  states: IState[];
  tags: ITags;
}

export interface ITags {
  PRODUCT: string[];
  OFFER: string[];
  BUSINESS: string[];
  EVENT: string[];
}

export interface IChartSeries {
  name: string;
  data: number[];
}

export interface ITokenResponse {
  access: {
    value: string;
    options: {
      path: string;
      expires: Date;
      httpOnly: boolean;
      sameSite: "lax" | "strict" | "none";
    };
  };
  refresh: {
    value: string;
    options: {
      path: string;
      expires: Date;
      httpOnly: boolean;
      sameSite: "lax" | "strict" | "none";
    };
  };
}

export interface IMetaResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}
