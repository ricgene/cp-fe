import { IAddress, IMedia } from "@/types";

// INTERFACES
export interface IEvent {
  id: number;
  name: string;
  endDate: string;
  details: string;
  startDate: string;
  image: IMedia;
  address: IAddress;
}
