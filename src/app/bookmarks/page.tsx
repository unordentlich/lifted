import styles from "./page.module.css";
import Feed from "../trending/components/feed/Feed";
import pool from "@/lib/database";
import { Post } from "@/types/Post";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwtUtils";

export default async function Home() {
    const c = await cookies();

    const user = await verifyToken(c.get('access_token')?.value!);
    if(!user) {
        return <div></div>;
    }

    if(!pool) {
        return <div></div>;
    }

    let postArray: Post[] = [];
    const [posts]: any[] = await pool.query(`
        SELECT
    posts.\`uuid\` AS postUUID,
    posts.\`id\`,
    content,
    creation_date,
    views,
    author,
    response_to,
    users.display_name,
    users.username,
    shares,
    (SELECT COUNT(*) FROM likes WHERE likes.post_uuid = postUUID) AS likeAmount,
    (SELECT EXISTS(SELECT * FROM likes WHERE likes.post_uuid = postUUID AND likes.liker_uuid = ?)) AS hasLiked,
    (SELECT COUNT(*) FROM bookmarks WHERE bookmarks.post_uuid = postUUID) AS bookmarkAmount,
    (SELECT EXISTS(SELECT * FROM bookmarks WHERE bookmarks.post_uuid = postUUID AND bookmarks.booker_uuid = ?)) AS hasBookmarked,
    (SELECT COUNT(*) FROM posts WHERE response_to = postUUID) AS commentAmount,
    (response_to IS NOT NULL) AS isResponse
FROM bookmarks
        LEFT JOIN posts ON bookmarks.post_uuid = posts.uuid LEFT JOIN users ON users.uuid = posts.author WHERE booker_uuid = ? ORDER BY creation_date DESC LIMIT 20;`, [user.uuid, user.uuid, user.uuid]);
    for(const post of posts) {
        postArray.push({
            id: post.id,
            uuid: post.postUUID,
            content: post.content,
            creationDate: new Date(post.creation_date),
            likes: post.likeAmount,
            bookmarks: post.bookmarkAmount,
            commentAmount: post.commentAmount,
            hasBookmarked: post.hasBookmarked,
            hasLiked: post.hasLiked,
            existing: true,
            authorDisplayname: post.display_name,
            authorUsername: post.username,
            shareAmount: post.shares,
            isReply: post.isResponse,
        });
    }

    return (
        <div>
            <h3 style={{ marginBottom: '20px', marginTop: '10px', width: '100%' }}>Following</h3>
            <Feed posts={postArray} markReplies />
        </div>

    );
}