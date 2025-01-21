import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwtUtils';
import variables from './lib/variables';


export function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token');

    if (!token) {
        return NextResponse.redirect(new URL(variables.loginUrl, req.url));
    }

    try {
        verifyToken(token.value);
    } catch (error) {
        return NextResponse.redirect(new URL(variables.loginUrl, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/profile/:path*', '/:username/:path*'],
};