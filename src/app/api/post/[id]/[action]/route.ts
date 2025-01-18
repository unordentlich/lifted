import pool from "@/lib/database";
import { verifyToken } from "@/lib/jwtUtils";
import { Post } from "@/types/Post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string, action: string }> }) {
  const postUuid = (await params).id;
  const action = (await params).action;

  if (!postUuid || !action) {
    return new NextResponse(JSON.stringify({ message: "Invalid request" }), { status: 400 });
  }

  if (!req.cookies.has('access_token')) {
    return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
  }
  const authToken = req.cookies.get('access_token')?.value;

  if (!authToken) {
    return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
  }

  let userAccount: { uuid: string, email: string };
  try {
    userAccount = await verifyToken(authToken) as { uuid: string, email: string };
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
  }
  if (!userAccount) {
    return new NextResponse(JSON.stringify({ message: "You must be logged in to perform this action" }), { status: 401 });
  }

  if (action === 'like') {
    // Like the post
  } else if (action === 'dislike') {
    // Dislike the post
  } else if (action === 'reply') {
    let { content } = { content: '' };
    try {
      ({ content } = await req.json());
    } catch (error) {
      return new NextResponse(JSON.stringify({ message: "Invalid request" }), { status: 400 });
    }

    if (!pool) {
      return new NextResponse(JSON.stringify({ message: "An error occurred while trying to reply to the post" }), { status: 500 });
    }

    const [rows]: any = await pool.query(`
      INSERT INTO posts (content, author, response_to)
SELECT ?, ?, ?
WHERE EXISTS (
    SELECT 1
    FROM posts
    WHERE posts.uuid = ?
);
SELECT id, uuid, creation_date FROM posts WHERE id = LAST_INSERT_ID();
`, [content, userAccount.uuid, postUuid, postUuid]);

    if (!rows[0].affectedRows || rows[0].affectedRows === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid post" }), { status: 400 });
    }

    let post: Post = {
      id: rows[1][0].id,
      content,
      uuid: rows[1][0].uuid,
      creationDate: new Date(rows[1][0].creation_date),
      existing: true,
    };
    return new NextResponse(JSON.stringify({ message: "Reply posted",
      reply: {
        id: post.id,
        uuid: post.uuid,
        content: post.content,
        creationDate: post.creationDate,
      }
     }), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify({ message: "Invalid action" }), { status: 400 });
  }


}