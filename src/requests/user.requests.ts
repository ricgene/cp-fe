import { api } from "@/libs";
import { IUser, RoleType, IPaginationParams, IMetaResponse } from "@/types";

interface GetAllUsersParams extends IPaginationParams {
  role?: RoleType;
}

interface IRegisteredUsersResponse {
  users: IUser[];
  meta: IMetaResponse;
}

// ENDPOINT URLS
export const meUrl = "/user/me";
export const registeredUsersUrl = "/user/all";

// REQUESTS
export const loadUser = () => api.get<{ user: IUser }>(meUrl);

export const getRegisteredUsers = (params: GetAllUsersParams) =>
  api.get<IRegisteredUsersResponse>(registeredUsersUrl, {
    params,
  });

export const updateUser = (data: FormData) =>
  api.patch(registeredUsersUrl, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
