import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('accessToken');

    if (pathname === '/') {
        if (!accessToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (pathname === '/login' || pathname === '/register') {
        if (accessToken) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}
