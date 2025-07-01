import { AllotmentPointTransactionTypeEnum } from "@/enums";

// Interfaces
export interface IPointTransaction {
  id: number;
  name: string;
  publicId: string;
  points: number;
  reason: string;
  createdAt: string;
}

// Enum Types
export type AllotmentPointTransactionType =
  keyof typeof AllotmentPointTransactionTypeEnum;
