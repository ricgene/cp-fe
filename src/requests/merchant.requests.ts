import { api } from "@/libs";
import { IUser } from "@/types";
import { IMetaResponse } from "@/types/misc.types";
import { RequestStatusEnum, RequestTypeEnum } from "@/enums";

// REQUEST INTERFACES
interface GetAllRequestsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: RequestStatusEnum;
}

interface RejectRequestParams {
  reason: string;
}

interface IAllRequestsResponse {
  requests: {
    id: number;
    type: RequestTypeEnum;
    status: RequestStatusEnum;
    reason: string;
    data: {
      merchantData: IUser;
    };
  }[];
  meta: IMetaResponse;
}

// ENDPOINT URLS
const baseRequestUrl = "/admin-requests";

export const getAllRequests = async (params: GetAllRequestsParams) => {
  return await api.get<IAllRequestsResponse>(baseRequestUrl, { params });
};

export const acceptRequest = async (id: number) => {
  return await api.patch(`${baseRequestUrl}/${id}/accept`);
};

export const rejectRequest = async (id: number, body: RejectRequestParams) => {
  return await api.patch(`${baseRequestUrl}/${id}/reject`, body);
};
