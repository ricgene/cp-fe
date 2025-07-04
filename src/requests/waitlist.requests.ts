import { api } from "@/libs";
import { IPaginationParams } from "@/types";
import { IWaitlistPaginatedResponse } from "@/types";

// REQUEST INTERFACES
interface AddToWaitlistRequest {
  email: string;
}

// ENDPOINT URLS
const addToWaitlistUrl = "/waitlist/add";
const getWaitlistAdminUrl = "/waitlist";

// REQUESTS
export const addToWaitlist = (data: AddToWaitlistRequest) =>
  api.post(addToWaitlistUrl, data);

export const getWaitlistAdmin = (params: IPaginationParams) =>
  api.get<IWaitlistPaginatedResponse>(getWaitlistAdminUrl, { params });
