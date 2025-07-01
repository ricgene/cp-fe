import { api } from "@/libs";
import { IMetaResponse } from "@/types/misc.types";
import {
  AllotmentPointTransactionType,
  IPointTransaction,
} from "@/types/point-transaction.types";

interface GetAllPointTransactionsParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface AllocatePointsParams {
  points: number;
  reason: string;
  publicIds: string[];
  type: AllotmentPointTransactionType;
}

interface IAllPointTransactionsResponse {
  transactions: IPointTransaction[];
  meta: IMetaResponse;
}

const getPointsUrl = "/point-transactions?filter=EARNED";
const allotmentUrl = "/point-transactions/allocate";

export const getAllPointTransactions = async (
  params: GetAllPointTransactionsParams
) => {
  return await api.get<IAllPointTransactionsResponse>(getPointsUrl, {
    params,
  });
};

export const allocatePoints = async (data: AllocatePointsParams) => {
  return await api.post(allotmentUrl, data);
};
