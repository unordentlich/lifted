import pool from "@/lib/database";
import { verifyToken } from "@/lib/jwtUtils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const { username, profilePicture, displayName } = await req.json();
    if (!pool || (!username && !profilePicture && !displayName)) {
        return new NextResponse(JSON.stringify({ message: "An error occurred while trying to perform the action" }), { status: 500 });
    }

    if (!req.cookies.has('access_token')) {
        return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
    }
    const authToken = req.cookies.get('access_token')?.value;

    if (!authToken) {
        return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
    }

    let userAccount: { uuid: string; username: string; displayname: string; email: string };
    try {
        userAccount = await verifyToken(authToken) as { uuid: string; username: string; displayname: string; email: string };
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
    }
    if (!userAccount) {
        return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
    }

    let query = `UPDATE users SET `;
    let values: string[] = [];
    if (username) {
        query += `username = ?, `;
        values.push(username.toLowerCase().replace(/^\s+|\s+$/g, ''));
    }
    if (profilePicture) {
        query += `profile_picture = ?, `;
        values.push(profilePicture);
    }
    if (displayName) {
        query += `display_name = ?, `;
        values.push(displayName);
    }
    query = query.slice(0, -2);
    query += ` WHERE uuid = ?`;
    values.push(userAccount.uuid);

    let userAccountUpdate: { uuid: string; username: string; displayname: string; email: string };
    userAccountUpdate = userAccount;
    if (username) {
        userAccountUpdate.username = username.toLowerCase().replace(/^\s+|\s+$/g, '');
    }
    if (displayName) {
        userAccountUpdate.displayname = displayName;
    }

    //todo check if username already taken
    const [rows]: any = await pool.query(query, values);
    return new NextResponse(JSON.stringify({ message: "Profile updated", newUser: userAccountUpdate}), { status: 200 });
}