import { NextResponse, NextRequest } from 'next/server'
import { SPOTIFY_TOKEN_COOKIE_NAME } from './lib/constants';
import { LOCATION_ORIGIN_HEADER_NAME, ACCESS_TOKEN_HEADER_NAME } from './lib/middleware-constants';

export function middleware(request: NextRequest) {
    const headers = new Headers(request.headers);
    headers.set(LOCATION_ORIGIN_HEADER_NAME, request.nextUrl.origin);
    
    const accessTokenCookie = request.cookies.get(SPOTIFY_TOKEN_COOKIE_NAME);
    if (accessTokenCookie) {
        headers.set(ACCESS_TOKEN_HEADER_NAME, accessTokenCookie.value)
    }
    return NextResponse.next({headers});
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}