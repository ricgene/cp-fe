import { api } from "@/libs";
import { IUser } from "@/types";
import { AxiosPromise } from "axios";

// ENDPOINT URLS
export const meUrl = "/user/me";

// REQUESTS
export const loadUser = (): AxiosPromise<{ user: IUser }> => api.get(meUrl);
