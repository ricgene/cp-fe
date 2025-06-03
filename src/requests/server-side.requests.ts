import { joinUrl } from "@/utils";
import { IStaticData, IUser } from "@/types";
import { CACHE_REVALIDATION_TIME_FOR_STATIC_DATA } from "@/constants";

// ENDPOINT URLS
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const meUrl = joinUrl(baseUrl!, "auth/web/me");
const staticDataUrl = joinUrl(baseUrl!, "static-data");

// REQUESTS
const getStaticData = async () => {
  try {
    const res = await fetch(staticDataUrl, {
      method: "GET",
      next: {
        revalidate: CACHE_REVALIDATION_TIME_FOR_STATIC_DATA,
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data as IStaticData;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("[SERVER-SIDE] Static data not found");
    return null;
  }
};

const getUser = async () => {
  try {
    const res = await fetch(meUrl, {
      method: "GET",
      next: {
        revalidate: CACHE_REVALIDATION_TIME_FOR_STATIC_DATA,
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.user as IUser;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("[SERVER-SIDE] User data not found");
    return null;
  }
};

export const getLayoutData = async () => {
  try {
    const [staticData, user] = await Promise.all([getStaticData(), getUser()]);
    return { staticData, user };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("[SERVER-SIDE] Layout data not found");
    return { staticData: null, user: null };
  }
};
