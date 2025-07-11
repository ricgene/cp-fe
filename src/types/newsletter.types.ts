export interface ISubscriptionsEntry {
  id: number;
  email: string;
  createdAt: string;
}

export interface ISubscriptionsPaginatedResponse {
  data: ISubscriptionsEntry[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
