import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 处理字体请求
  if (request.nextUrl.pathname.includes("/static/fonts/")) {
    return NextResponse.next({
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // 处理图标请求
  if (request.nextUrl.pathname.includes("/icon")) {
    return NextResponse.next({
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "image/x-icon",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/static/fonts/:path*", "/icon"],
};
