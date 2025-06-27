import { api } from "@/libs";
import { IMetaResponse } from "@/types/misc.types";
import { IPointTransaction } from "@/types/point-transaction.types";

interface GetAllPointTransactionsParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface IAllPointTransactionsResponse {
  transactions: IPointTransaction[];
  meta: IMetaResponse;
}

const basePointsUrl = "/point-transactions?filter=EARNED";

export const getAllPointTransactions = async (
  params: GetAllPointTransactionsParams
) => {
  return await api.get<IAllPointTransactionsResponse>(basePointsUrl, {
    params,
  });
};
