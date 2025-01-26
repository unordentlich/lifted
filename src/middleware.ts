import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwtUtils';
import variables from './lib/variables';


export async function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token');
    var returnResponse = NextResponse.next();

    if (!token) {
        return NextResponse.redirect(new URL(variables.loginUrl, req.url));
    }

    try {
        var result = await verifyToken(token.value);
        if(!result) {
            return NextResponse.redirect(new URL(variables.loginUrl, req.url));
        }
        returnResponse.cookies.set('user', JSON.stringify(result));
        
    } catch (error) {
        return NextResponse.redirect(new URL(variables.loginUrl, req.url));
    }

    return returnResponse;
}

export const config = {
    matcher: ['/following', '/trending', '/bookmarks', '/profile/:path*', '/:username/post/:path*'],
};