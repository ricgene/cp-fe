import { AlertTypeEnum } from "@/enums";

// TYPES
export type AlertType = (typeof AlertTypeEnum)[keyof typeof AlertTypeEnum];

// INTERFACES
export interface IAlert {
  id: number;
  title: string;
  type: AlertType;
  state: string;
  city: string;
  audience: string;
  createdAt: string;
  precautions: string;
}
