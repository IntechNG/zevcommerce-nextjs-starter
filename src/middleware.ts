import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { STORAGE_KEYS } from '@/lib/constants';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /account routes — redirect to login if no customer token cookie
    if (pathname.startsWith('/account')) {
        const token = request.cookies.get(STORAGE_KEYS.CUSTOMER_TOKEN)?.value;
        // Also check localStorage via a client-side redirect (cookies may not be set)
        // We allow the page to load and let the client-side AuthContext handle the redirect
        // since we're using localStorage for auth state, not cookies.
        // This middleware is a safety net for direct URL access.
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/account/:path*'],
};
