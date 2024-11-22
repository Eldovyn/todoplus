import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('accessToken');
    const secret = process.env.SECRET_KEY;

    if (pathname === '/') {
        if (!accessToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        try {
            const { payload } = await jwtVerify(accessToken.value, new TextEncoder().encode(secret));
        } catch (error) {
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('accessToken');
            return response;
        }
    }

    if (pathname === '/login' || pathname === '/register') {
        if (accessToken) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}
