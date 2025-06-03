import { api } from "@/libs";
import { IUser } from "@/types";
import { logError } from "@/utils";

// ENDPOINT URL
const getSessionUrl = "/user/me?filter=MINIMAL";

export const getSession = async (): Promise<IUser | null> => {
  try {
    const response = await api.get(getSessionUrl);
    if (!response?.data) return null;

    return response?.data || null;
  } catch (error) {
    logError(error);
    return null;
  }
};
