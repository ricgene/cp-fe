import { api } from "@/libs";
import { IEvent, IMetaResponse, IPaginationParams } from "@/types";

// REQUEST INTERFACES
export interface CreateEventRequest {
  name: string;
  city: string;
  type: string;
  state: string;
  address: string;
  endDate: string;
  details: string;
  image: FileList;
  latitude: number;
  longitude: number;
  startDate: string;
}

// ENDPOINT URLS
const createEventUrl = "/events";
const getAllEventsUrl = "/events";
const deleteEventUrl = "/events"; // use with /:id

type GetAllEventsParams = IPaginationParams;

interface IAllEventsResponse {
  events: IEvent[];
  meta: IMetaResponse;
}

// REQUESTS
export const createEvent = async (data: FormData) => {
  return await api.post(createEventUrl, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllEvents = async (params: GetAllEventsParams) => {
  return await api.get<IAllEventsResponse>(getAllEventsUrl, { params });
};

export const deleteEvent = (id: number) =>
  api.delete(`${deleteEventUrl}/${id}`);
