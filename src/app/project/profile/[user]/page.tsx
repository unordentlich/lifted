import Navbar from "@/styles/components/navbar/Navbar";
import styles from './page.module.css';
import Profile from "./components/Profile";
import { User } from "@/types/User";
import pool from "@/lib/database";
import { Post } from "@/types/Post";

export default async function ProjectProfilePage({
    params,
}: {
    params: Promise<{ user: string }>
}) {
    const user = (await params).user;
    let userObject: User = {
        existing: false,
    };;
    let posts: Post[] = [];
    let postAmount = 0, likesAmount = 0, followerAmount = 0, viewsAmount = 0;


    if (user && user !== '' && user.startsWith('%40')) { // %40 is the URL encoded version of @
        if (pool) {
            const [rows]: any[] = await pool.execute('SELECT users.`uuid`, users.`display_name`, users.`username`, users.`created`, users.`email`, posts.`id`, posts.`content`, posts.`creation_date`, posts.`likes`, posts.`bookmarks`, posts.`author`, (SELECT COUNT(*) FROM posts WHERE posts.author = users.`uuid`) AS post_count, (SELECT SUM(posts.likes) FROM posts WHERE posts.author = users.`uuid`) AS likes_count, (SELECT COUNT(*) FROM followers WHERE following_uuid = users.`uuid`) AS follower_count, (SELECT SUM(posts.`views`) FROM posts WHERE author = users.`uuid`) AS views_count FROM users LEFT JOIN posts ON users.`uuid` = posts.author WHERE username = ?;'
                , [user.replace('%40', '')]);
            if (rows.length === 0) {
                userObject = {
                    existing: false,
                };
            } else {
                userObject = {
                    existing: true,
                    uuid: rows[0].uuid,
                    displayName: rows[0].display_name,
                    userName: rows[0].username,
                    email: rows[0].email,
                    createdAt: rows[0].created_at,
                };
                postAmount = rows[0].post_count;
                likesAmount = rows[0].likes_count || 0;
                followerAmount = rows[0].follower_count || 0;
                viewsAmount = rows[0].views_count || 0;

                for (const row of rows) {
                    if (!row.id) continue;
                    posts.push({
                        id: row.id,
                        content: row.content,
                        likes: row.likes,
                        bookmarks: row.bookmarks,
                        creationDate: row.creation_date,
                        authorUuid: row.author,
                        authorDisplayname: row.display_name,
                        authorUsername: row.username,
                        views: row.views,
                        existing: true,
                    });
                }
            }
        }
    }

    return (
        <div className={styles.flexContainer}>
            <div className={styles.container}>
                <Profile user={userObject} posts={posts} postAmount={postAmount} likesAmount={likesAmount} followerAmount={followerAmount} viewAmount={viewsAmount} />
            </div>
        </div>
    );
}