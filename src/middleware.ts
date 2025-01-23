import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwtUtils';
import variables from './lib/variables';


export async function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token');

    if (!token) {
        return NextResponse.redirect(new URL(variables.loginUrl, req.url));
    }

    try {
        var result = await verifyToken(token.value);
        console.log(result);
        if(!result) {
            return NextResponse.redirect(new URL(variables.loginUrl, req.url));
        }
    } catch (error) {
        return NextResponse.redirect(new URL(variables.loginUrl, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/following', '/trending', '/bookmarks', '/profile/:path*', '/:username/post/:path*'],
};