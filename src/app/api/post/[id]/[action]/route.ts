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

  if (!pool) {
    return new NextResponse(JSON.stringify({ message: "An error occurred while trying to perform the action" }), { status: 500 });
  }

  if (action === 'like') {
    const [rows]: any = await pool.query(`
      INSERT INTO likes (likes.post_uuid, liker_uuid)
SELECT ?, ?
WHERE NOT EXISTS (
    SELECT 1
    FROM likes
    WHERE liker_uuid = ? AND post_uuid = ?
);`, [postUuid, userAccount.uuid, userAccount.uuid, postUuid]);

    if (!rows.affectedRows || rows.affectedRows === 0) {
      return new NextResponse(JSON.stringify({ message: "Already liked" }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: "Post liked" }), { status: 200 });
  } else if (action === 'dislike') {
    const [rows]: any = await pool.query(`
      DELETE FROM likes WHERE post_uuid = ? AND liker_uuid = ?;`, [postUuid, userAccount.uuid]);

    if (!rows.affectedRows || rows.affectedRows === 0) {
      return new NextResponse(JSON.stringify({ message: "Post not liked before" }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: "Post like removed" }), { status: 200 });
  } else if (action === 'bookmark') {
    const [rows]: any = await pool.query(`
      INSERT INTO bookmarks (bookmarks.post_uuid, booker_uuid)
SELECT ?, ?
WHERE NOT EXISTS (
    SELECT 1
    FROM bookmarks
    WHERE booker_uuid = ? AND post_uuid = ?
);`, [postUuid, userAccount.uuid, userAccount.uuid, postUuid]);


    if (!rows.affectedRows || rows.affectedRows === 0) {
      return new NextResponse(JSON.stringify({ message: "Post already bookmarked" }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: "Post bookmarked" }), { status: 200 });

  } else if(action === 'unbookmark') {
    const [rows]: any = await pool.query(`
      DELETE FROM bookmarks WHERE post_uuid = ? AND booker_uuid = ?;`, [postUuid, userAccount.uuid]);

    if (!rows.affectedRows || rows.affectedRows === 0) {
      return new NextResponse(JSON.stringify({ message: "Post not bookmarked before" }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: "Post bookmark removed" }), { status: 200 });

  } else if (action === 'reply') {
    let { content } = { content: '' };
    try {
      ({ content } = await req.json());
    } catch (error) {
      return new NextResponse(JSON.stringify({ message: "Invalid request" }), { status: 400 });
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
    return new NextResponse(JSON.stringify({
      message: "Reply posted",
      reply: {
        id: post.id,
        uuid: post.uuid,
        content: post.content,
        creationDate: post.creationDate,
      }
    }), { status: 200 });
  } else if(action === 'share') {
    const [rows]: any = await pool.query(`
      UPDATE posts SET shares = shares + 1 WHERE uuid = ?; SELECT shares FROM posts WHERE uuid = ?;`, [postUuid, postUuid]);

    if (!rows[0].affectedRows || rows[0].affectedRows === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid post" }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: "Post shared", newAmount: rows[0].shares }), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify({ message: "Invalid action" }), { status: 400 });
  }
}