import { cookies } from "next/headers";
import { joinUrl, logError } from "@/utils";
import { ITokenResponse, IUser } from "@/types";
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from "@/constants";
import { NextRequest } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const getSessionUrl = joinUrl(baseUrl!, "user/me?filter=MINIMAL");
const logoutSessionUrl = joinUrl(baseUrl!, "auth/web/logout");

const fetchSession = async (options: RequestInit) => {
  const response = await fetch(getSessionUrl, options);
  const data = await response.json();
  console.log(`[SERVER SESSION] Session status: ${response.status}`);
  console.log(`[SERVER SESSION] Session data: ${JSON.stringify(data)}`);
  return { response, data };
};

const logoutSession = async (options: RequestInit) => {
  const response = await fetch(logoutSessionUrl, options);
  console.log(`[SERVER SESSION] Logout status: ${response.status}`);
  return response;
};

const refreshSession = async (url: string, refreshToken: string) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });
  const data = await response.json();
  console.log(`[SERVER SESSION] Refresh status: ${response.status}`);
  console.log(`[SERVER SESSION] Refresh data: ${JSON.stringify(data)}`);
  return { response, data };
};

export const getServerSession = async (
  req: NextRequest
): Promise<IUser | null> => {
  const { origin } = req.nextUrl;
  const refreshUrl = joinUrl(origin, "/api/refresh");
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_COOKIE_NAME)?.value;
    const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    };

    // Log the tokens
    console.log(
      `[SERVER SESSION] Access Token: [${
        !!accessToken ? accessToken.slice(0, 15) + "..." : "Not found"
      }]`
    );
    console.log(
      `[SERVER SESSION] Refresh Token: [${
        !!refreshToken ? refreshToken.slice(0, 15) + "..." : "Not found"
      }]`
    );

    // ------------------------------------------------------------------------

    // (No access token found, log out)
    if (!accessToken) {
      console.log("[SERVER SESSION] No access token found, logging out...");
      await logoutSession(options);
      return null;
    }

    // (Fetch user session with access token)
    console.log("[SERVER SESSION] Fetching user session with access token...");
    const session = await fetchSession(options);
    const sessionData = session.data;
    const sessionResponse = session.response;

    // (Session fetch failed)
    if (!sessionResponse.ok) {
      // (No refresh token found, log out)
      if (!refreshToken) {
        console.log("[SERVER SESSION] No refresh token found, logging out...");
        await logoutSession(options);
        return null;
      }

      // (Access token expired, refresh)
      if (sessionData?.errorCode === "ACCESS_TOKEN_EXPIRED") {
        console.log("[SERVER SESSION] Attempting to refresh access token...");
        const refresh = await refreshSession(refreshUrl, refreshToken);
        const refreshData = refresh.data;
        const refreshResponse = refresh.response;

        // (Token refresh failed, log out)
        if (!refreshResponse.ok) {
          console.log("[SERVER SESSION] Token refresh failed, logging out ...");
          await logoutSession(options);
          return null;
        }

        // (Set new tokens)
        const newTokens = refreshData as ITokenResponse;
        cookieStore.set(ACCESS_COOKIE_NAME, newTokens.access.value, {
          ...newTokens.access.options,
          expires: new Date(newTokens.access.options.expires),
        });
        cookieStore.set(REFRESH_COOKIE_NAME, newTokens.refresh.value, {
          ...newTokens.refresh.options,
          expires: new Date(newTokens.refresh.options.expires),
        });
        console.log(
          "[SERVER SESSION] Updated cookies:",
          newTokens.access.value,
          newTokens.refresh.value
        );

        // (Retry session fetch)
        console.log(
          "[SERVER SESSION] Retrying session fetch with new access token..."
        );
        const newSession = await fetchSession({
          ...options,
          headers: {
            Authorization: `Bearer ${newTokens.access.value}`,
          },
        });
        const newSessionData = newSession.data;
        const newSessionResponse = newSession.response;

        // (Session fetch failed)
        if (!newSessionResponse.ok) {
          console.error("[SERVER SESSION] Retry session fetch failed");
          return null;
        }

        // (Return user session)
        return newSessionData?.user || null;
      } else {
        console.log("[SERVER SESSION] Unhandled session fetch failure");
        return null;
      }
    } else {
      // (Return user session)
      return sessionData?.user || null;
    }
  } catch (error) {
    console.log("[SERVER SESSION] Error fetching session");
    logError(error);
    return null;
  }
};
