import { joinUrl } from "@/utils";
import { IStaticData } from "@/types";
import { CACHE_REVALIDATION_TIME_FOR_STATIC_DATA } from "@/constants";

// ENDPOINT URLS
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
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

export const getLayoutData = async () => {
  try {
    const staticData = await getStaticData();
    return { staticData };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("[SERVER-SIDE] Layout data not found");
    return { staticData: null };
  }
};
