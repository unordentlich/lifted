import NotFound from "@/styles/components/error/notFound/NotFound";
import styles from './page.module.css';
import pool from "@/lib/database";
import { verifyToken } from "@/lib/jwtUtils";
import { cookies } from "next/headers";
import { Post } from "@/types/Post";
import PostOverview from "./components/PostOverview";
import { QueryResult } from "mysql2";

export default async function PostPage({ params }: { params: Promise<{ user: string, id: string }> }) {
    const p = await params;
    const cookieStore = cookies();
    const token = (await cookieStore).get('access_token')?.value;

    if (!token) return <NotFound object="post" />;

    const userAccount = await verifyToken(token) as { uuid: string, email: string };

    const posts: Post[] = [];

    try {
        if (pool) {
            const [rows]: any[] = await pool.query(`WITH RECURSIVE reply_hierarchy AS (
    -- Erste Ebene: Direkt Antworten auf den Originalpost
    SELECT
        posts.uuid AS original_post_uuid,
        posts.uuid AS reply_uuid, -- Der Originalpost zählt als eigene Antwort
        posts.id,
        posts.content,
        posts.creation_date,
        posts.views,
        posts.author,
        posts.response_to, -- Der Originalpost hat keine Antwort
        0 AS depth -- Originalpost ist auf Ebene 0
    FROM posts
    WHERE posts.id = ? AND response_to IS NULL -- ID des Originalposts

    UNION ALL

    -- Rekursive Teile für Antworten bis zur dritten Ebene
    SELECT
        reply_hierarchy.original_post_uuid,
        deeper_replies.uuid AS reply_uuid,
        deeper_replies.id,
        deeper_replies.content,
        deeper_replies.creation_date,
        deeper_replies.views,
        deeper_replies.author,
        deeper_replies.response_to,
        reply_hierarchy.depth + 1
    FROM reply_hierarchy
             JOIN posts AS deeper_replies ON deeper_replies.response_to = reply_hierarchy.reply_uuid
    WHERE reply_hierarchy.depth < 3 -- Maximale Tiefe = 3
)
SELECT
    rh.original_post_uuid,
    rh.reply_uuid,
    rh.id,
    rh.content,
    rh.creation_date,
    rh.views,
    rh.author,
    rh.response_to,
    rh.depth,
    users.display_name,
    users.username,
    (SELECT COUNT(*) FROM likes WHERE likes.post_uuid = rh.reply_uuid) AS likeAmount,
    (SELECT EXISTS(SELECT * FROM likes WHERE likes.post_uuid = rh.reply_uuid AND likes.liker_uuid = ?)) AS hasLiked,
    (SELECT COUNT(*) FROM bookmarks WHERE bookmarks.post_uuid = rh.reply_uuid) AS bookmarkAmount,
    (SELECT EXISTS(SELECT * FROM bookmarks WHERE bookmarks.post_uuid = rh.reply_uuid AND bookmarks.booker_uuid = ?)) AS hasBookmarked
FROM reply_hierarchy rh
         LEFT JOIN users ON users.uuid = rh.author ORDER BY rh.depth, rh.creation_date DESC;
`, [p.id, userAccount.uuid, userAccount.uuid]);
            if (rows.length > 0) {
                rows.forEach((element: any, index: number) => {
                    posts.push({
                        id: element.id,
                        uuid: element.reply_uuid,
                        content: element.content,
                        likes: element.likeAmount,
                        bookmarks: element.bookmarkAmount,
                        creationDate: element.creation_date,
                        authorUuid: element.author,
                        authorDisplayname: element.display_name,
                        authorUsername: element.username,
                        views: element.views,
                        existing: true,
                        refPost: posts.find((p: Post) => p.uuid === element.response_to) || undefined,
                        depth: element.depth,
                        hasLiked: element.hasLiked,
                        hasBookmarked: element.hasBookmarked
                    });
                });
            }
        }
    } catch (e) {
        console.error(e);
    }

    return (
        <div className={styles.flexContainer}>
            {(!p.user || !p.id) && <NotFound object="post" />}
            <div className={styles.flex}>
                <PostOverview posts={posts} />
            </div>
        </div>
    )

}