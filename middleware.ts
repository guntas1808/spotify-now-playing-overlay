import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import queryString from 'query-string';

export function middleware(request: NextRequest) {
    const headers = new Headers(request.headers);
    const accessToken = request.nextUrl.searchParams.get("access_token");

    headers.set("x-location-origin", request.nextUrl.origin);
    headers.set("x-access-token", accessToken ?? "");
    
    return NextResponse.next({headers});
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}