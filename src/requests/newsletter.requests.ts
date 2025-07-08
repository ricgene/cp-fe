import { api } from "@/libs";

// REQUEST INTERFACES
interface SubscribeToNewsletterRequest {
  email: string;
}

// ENDPOINT URLS
const subscribeToNewsletterUrl = "/newsletter/subscribe";

// REQUESTS
export const subscribeToNewsletter = (data: SubscribeToNewsletterRequest) =>
  api.post(subscribeToNewsletterUrl, data);
