import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const headers = new Headers(request.headers);
    headers.set("x-location-origin", request.nextUrl.origin);
    
    return NextResponse.next({headers});
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}