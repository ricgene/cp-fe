import { api } from "@/libs";

// REQUEST INTERFACES
interface AddToWaitlistRequest {
	email: string;
}

// ENDPOINT URLS
const addToWaitlistUrl = "/waitlist/add";

// REQUESTS
export const addToWaitlist = (data: AddToWaitlistRequest) =>
	api.post(addToWaitlistUrl, data);
