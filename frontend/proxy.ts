
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";


export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;


  const pathname = req.nextUrl.pathname;

  const loggedIn = !!token;

  // pages anyone can access
  const publicRoutes = ["/login"];

  if (!loggedIn && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // prevent logged users from seeing login
  if (loggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next).*)"],
};
