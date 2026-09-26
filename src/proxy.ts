import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/jwt";

const CREATOR_ONLY_PATHS = ["/upload", "/dashboard"];
const AUTH_REQUIRED_PATHS = ["/saved", "/account", ...CREATOR_ONLY_PATHS];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requiresAuth = AUTH_REQUIRED_PATHS.some((path) => pathname.startsWith(path));
  if (!requiresAuth) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const requiresCreator = CREATOR_ONLY_PATHS.some((path) => pathname.startsWith(path));
  if (requiresCreator && session.role !== "CREATOR") {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/saved/:path*", "/account/:path*", "/upload/:path*", "/dashboard/:path*"],
};
