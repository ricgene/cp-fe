import { api } from "@/libs";
import { IUser } from "@/types";
import { AxiosPromise } from "axios";

// ENDPOINT URLS
const meUrl = "/auth/web/me";

// REQUESTS
export const loadUser = (): AxiosPromise<{ user: IUser }> => api.get(meUrl);
