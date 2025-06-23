import { api } from "@/libs";
import { AlertAudienceEnum } from "@/enums";
import { IMetaResponse } from "@/types/misc.types";
import { AlertType, IAlert } from "@/types/alert.types";

// REQUEST INTERFACES
interface GetAllAlertsParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface CreateAlertRequest {
  title: string;
  city?: string;
  state?: string;
  type: AlertType;
  precautions: string;
  audience: AlertAudienceEnum;
}

interface IAllAlertsResponse {
  alerts: IAlert[];
  meta: IMetaResponse;
}

// ENDPOINT URLS
const baseAlertUrl = "/alerts";

export const getAllAlerts = async (params: GetAllAlertsParams) => {
  return await api.get<IAllAlertsResponse>(baseAlertUrl, { params });
};

export const createAlert = async (data: CreateAlertRequest) => {
  return await api.post(baseAlertUrl, data);
};

export const deleteAlert = async (id: number) => {
  return await api.delete(`${baseAlertUrl}/${id}`);
};
