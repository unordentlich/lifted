import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwtUtils';

const loginUrl = '/project/login';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token');

    if (!token) {
        return NextResponse.redirect(new URL(loginUrl, req.url));
    }

    try {
        console.log('getting token:', token.value)
        verifyToken(token.value);
        
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL(loginUrl, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/project/home'],
};