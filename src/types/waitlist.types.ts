export interface IWaitlistEntry {
  id: number;
  email: string;
  createdAt: string;
  isEmailSent: boolean;
}

export interface IWaitlistPaginatedResponse {
  data: IWaitlistEntry[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
