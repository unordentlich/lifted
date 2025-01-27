import pool from "@/lib/database";
import { verifyToken } from "@/lib/jwtUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (!req.cookies.has('access_token')) {
        return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
    }
    const authToken = req.cookies.get('access_token')?.value;

    if (!authToken) {
        return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
    }

    let userAccount:  { uuid: string; username: string; displayname: string };
    try {
        userAccount = await verifyToken(authToken) as { uuid: string; username: string; displayname: string };
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
    }
    if (!userAccount) {
        return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
    }

    if (!pool) {
        return new NextResponse(JSON.stringify({ message: "An error occurred while trying to perform the action" }), { status: 500 });
    }

    const { content } = await req.json();
    if (!content) {
        return new NextResponse(JSON.stringify({ message: "Invalid request" }), { status: 400 });
    }

    const [rows]: any = await pool.query(`
        INSERT INTO posts (content, author, response_to)
        VALUES (?, ?, NULL); SELECT * FROM posts WHERE id = LAST_INSERT_ID()`, [content, userAccount.uuid]);
        
    if (!rows[0].affectedRows || rows[0].affectedRows === 0) {
        return new NextResponse(JSON.stringify({ message: "An error occurred while trying to perform the action" }), { status: 500 });
    }

    let post = {
        id: rows[1][0].id,
        uuid: rows[1][0].uuid,
        content: rows[1][0].content,
        creationDate: new Date(rows[1][0].creation_date),
        likes: 0,
        bookmarks: 0,
        commentAmount: 0,
        hasBookmarked: false,
        hasLiked: false,
        existing: true,
        authorDisplayname: userAccount.displayname,
        authorUsername: userAccount.username,
        shareAmount: 0,
    };

    return new NextResponse(JSON.stringify({ post }), { status: 201 });
}