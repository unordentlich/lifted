import NotFound from "@/styles/components/error/notFound/NotFound";
import styles from './page.module.css';
import pool from "@/lib/database";
import { verifyToken } from "@/lib/jwtUtils";
import { cookies } from "next/headers";
import { Post } from "@/types/Post";
import PostOverview from "./components/PostOverview";

export default async function PostPage({ params }: { params: Promise<{ user: string, id: string }> }) {
    const p = await params;
    const cookieStore = cookies();
    const token = (await cookieStore).get('access_token')?.value;

    if (!token) return <NotFound object="post" />;

    const userAccount = await verifyToken(token) as { uuid: string, email: string };

    let postObject: Post = {
        existing: false
    };
    try {
        if (pool) {
            const [posts]: any[] = await pool.query(`SELECT posts.uuid,
       id,
       content,
       creation_date,
       views,
       author,
       display_name,
       username,
       (SELECT COUNT(*) FROM likes WHERE post_uuid = posts.uuid)                                    AS likeAmount,
       (SELECT EXISTS(SELECT * FROM likes WHERE post_uuid = posts.uuid AND likes.liker_uuid = ?))              AS hasLiked,
       (SELECT COUNT(*) FROM bookmarks WHERE post_uuid = posts.uuid)                                AS bookmarkAmount,
       (SELECT EXISTS(SELECT *
                      FROM bookmarks
                      WHERE post_uuid = posts.uuid
                        AND bookmarks.booker_uuid = ?))                                                    AS hasBookmarked
FROM posts
         LEFT JOIN users ON users.uuid = posts.author
WHERE (id = ? AND users.username = ?);`, [userAccount.uuid, userAccount.uuid, p.id, p.user]);
            if (posts[0]) {
                postObject = {
                    id: posts[0].id,
                    content: posts[0].content,
                    likes: posts[0].likeAmount,
                    bookmarks: posts[0].bookmarkAmount,
                    creationDate: posts[0].creation_date,
                    authorUuid: posts[0].author,
                    authorDisplayname: posts[0].display_name,
                    authorUsername: posts[0].username,
                    views: posts[0].views,
                    existing: true
                };
            }
        }
    } catch (e) {
        console.error(e);
    }

    return (
        <div className={styles.flexContainer}>
            {(!p.user || !p.id) && <NotFound object="post" />}
            <div className={styles.flex}>
                <PostOverview originPost={postObject} />
            </div>
        </div>
    )

}