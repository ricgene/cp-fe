import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "@/constants";
import { IRouteConfig, IUser, PathsType, RoleType } from "@/types";
import { getServerSession } from "@/requests/server-session.requests";

// (Route entries)
const ROUTE_ENTRIES: IRouteConfig[] = Object.values(ROUTES);

// (Matches route)
const matchesRoute = (pathname: string, routePath: string): boolean => {
  if (routePath.endsWith("/*")) {
    const baseRoute = routePath.replace("/*", "");
    return pathname === baseRoute || pathname.startsWith(baseRoute + "/");
  }
  return pathname === routePath;
};

// (Get route config)
const getRouteConfig = (pathname: string): IRouteConfig | undefined =>
  ROUTE_ENTRIES.find(({ path }) => matchesRoute(pathname, path));

// (Handle redirects)
const handleRedirects = async (req: NextRequest, user: IUser | null) => {
  const { origin, pathname } = req.nextUrl;
  const route = getRouteConfig(pathname);

  // (1. Public Routes)
  if (route?.isPublic) {
    if (
      user &&
      [ROUTES.LOGIN.path, ROUTES.REGISTER.path].includes(pathname as PathsType)
    ) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD.path, origin));
    }
    return NextResponse.next();
  }

  // (2. Protected Routes: Not logged in)
  if (!user) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN.path, origin));
  }

  // (3. Protected Routes: Logged in)
  const userRole: RoleType | undefined = user?.role;
  const allowedRoles = route?.allowedRoles ?? [];

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD.path, origin));
  }

  return NextResponse.next();
};

//
//
//

// (Middleware)
export default async function middleware(req: NextRequest) {
  console.log("\n-------- MIDDLEWARE --------");
  const user = await getServerSession(req);
  console.log("\n[MIDDLEWARE] USER", user);
  console.log("-----------------------------\n");
  return handleRedirects(req, user);
}

//
//
//

// (Config)
export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|favicon.ico|api|static|.*\\.\\w+$).*)",
  ],
};
