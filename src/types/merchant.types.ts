import { RequestStatusEnum, RequestTypeEnum } from "@/enums";
import { IUser } from "./user.types";

// INTERFACES
export interface IMerchantRequest extends IUser {
  id: number;
  type: RequestTypeEnum;
  status: RequestStatusEnum;
  reason: string;
}
