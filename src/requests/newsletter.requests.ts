import { api } from "@/libs";
import { IPaginationParams, ISubscriptionsPaginatedResponse } from "@/types";

// REQUEST INTERFACES
interface SubscribeToNewsletterRequest {
  email: string;
}

// ENDPOINT URLS
const subscribeToNewsletterUrl = "/newsletter/subscribe";
const getNewsletterSubscriptionsUrl = "/newsletter";

// REQUESTS
export const subscribeToNewsletter = (data: SubscribeToNewsletterRequest) =>
  api.post(subscribeToNewsletterUrl, data);

export const getSubscriptionsList = (params: IPaginationParams) =>
  api.get<ISubscriptionsPaginatedResponse>(getNewsletterSubscriptionsUrl, {
    params,
  });
