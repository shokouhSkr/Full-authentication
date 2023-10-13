import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.NEXT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (pathname === "/") {
    if (!session) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/auth`);
      // return NextResponse.redirect(`https://skrfullauthentication.vercel.app/auth`);
    }
  }

  if (pathname === "/auth") {
    if (session) {
      return NextResponse.redirect(`${origin}`);
    }
  }
}
