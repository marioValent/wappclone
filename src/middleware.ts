import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");

    if (token) {
        if (!request.nextUrl.pathname.startsWith("/home"))
            return NextResponse.redirect(
                new URL("/home", request.url).toString()
            );
    } else {
        return NextResponse.redirect(new URL("/", request.url).toString());
    }
}

export const config = {
    matcher: "/home/:path*",
};
