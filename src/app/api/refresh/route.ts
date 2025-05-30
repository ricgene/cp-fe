import { NextRequest, NextResponse } from "next/server";
import { joinUrl } from "@/utils";
import { SerializeOptions } from "cookie";
import { REFRESH_COOKIE_NAME } from "@/constants";
import { ACCESS_COOKIE_NAME } from "@/constants";

// (Parse cookies)
const parseSetCookie = (
  header: string
): {
  name: string;
  value: string;
  options: SerializeOptions;
} | null => {
  const parts = header.split(";").map((p) => p.trim());
  const [nameValue, ...attrs] = parts;
  const [name, value] = nameValue.split("=");

  if (!name || !value) return null;

  const options: SerializeOptions = {};
  for (const attr of attrs) {
    const [key, val] = attr.split("=");
    const lcKey = key.toLowerCase();
    if (lcKey === "httponly") options.httpOnly = true;
    else if (lcKey === "secure") options.secure = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    else if (lcKey === "samesite") options.sameSite = val as any;
    else if (lcKey === "expires") options.expires = new Date(val);
    else if (lcKey === "path") options.path = val;
    else if (lcKey === "domain") options.domain = val;
  }

  return { name, value, options };
};

//
//
//

export async function POST(req: NextRequest) {
  const body = await req.json();
  const refreshToken = body.refreshToken;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 400 });
  }

  // (Refresh token request)
  const backendRes = await fetch(
    joinUrl(process.env.NEXT_PUBLIC_API_URL!, "auth/merchant/refresh-token"),
    {
      method: "GET",
      headers: {
        ReAuthorization: `Bearer ${refreshToken}`,
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  // (Refresh token request failed)
  if (!backendRes.ok) {
    const errorData = await backendRes.json().catch(() => null);
    console.error("[API/REFRESH]✖ Backend error", backendRes.status, errorData);
    return NextResponse.json(
      { error: "Failed to refresh", detail: errorData },
      { status: backendRes.status }
    );
  }

  // (Extract cookies)
  const setCookieHeader = backendRes.headers.get("set-cookie");

  // (No cookies received)
  if (!setCookieHeader) {
    console.log("[API/REFRESH]✖ No Cookies received from backend");
    return NextResponse.json({ error: "No cookies received" }, { status: 400 });
  }

  // (Received cookies)
  console.log(`[API/REFRESH]✔ Received Cookies: [${setCookieHeader}]`);

  // (Split cookies)
  const rawCookies = setCookieHeader.split(/,(?=[^;]+=)/);
  console.log("[API/REFRESH]✔ Number of raw cookies:", rawCookies.length);

  // (Parse cookies)
  const parsedCookies = rawCookies.map(parseSetCookie);
  console.log("[API/REFRESH]✔ Number of parsed cookies:", parsedCookies.length);

  // (Find access and refresh cookies)
  const access = parsedCookies.find((c) => c?.name === ACCESS_COOKIE_NAME);
  const refresh = parsedCookies.find((c) => c?.name === REFRESH_COOKIE_NAME);

  // (Missing expected cookies)
  if (!access || !refresh) {
    console.error("[API/REFRESH]✖ Missing expected access or refresh cookies");
    return NextResponse.json(
      { error: "Missing expected cookies" },
      { status: 400 }
    );
  }

  // (Successfully parsed access and refresh cookies)
  console.log("[API/REFRESH]✔ Successfully parsed access and refresh cookies");
  return NextResponse.json({
    access: {
      value: access.value,
      options: {
        ...access.options,
        expires: access.options.expires?.toISOString(),
      },
    },
    refresh: {
      value: refresh.value,
      options: {
        ...refresh.options,
        expires: refresh.options.expires?.toISOString(),
      },
    },
  });
}
