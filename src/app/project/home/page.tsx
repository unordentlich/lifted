import SidebarNavigation from "@/styles/components/sidenav/SidebarNavigation";
import Navbar from "../../../../styles/components/navbar/Navbar";
import styles from "./page.module.css";
import Feed from "./components/feed/Feed";
import pool from '@/lib/database';
import { Post } from "@/types/Post";

export default async function Login() {
    const posts: Post[] = [];

    try {
        if (pool) {
            const [rows]: any[] = await pool.execute('SELECT * FROM posts LEFT JOIN users ON posts.author = users.uuid;');
            for (const row of rows) {
                let post: Post = {
                    id: row.id,
                    content: row.content,
                    likes: row.likes,
                    bookmarks: row.bookmarks,
                    creationDate: row.creation_date,
                    authorUuid: row.author,
                    authorDisplayname: row.display_name,
                    authorUsername: row.username,
                };
                posts.push(post);
            }
        }
    } catch (error) {
        console.log(error);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Navbar />
            <div className={styles.flex}>
                <div style={{ position: 'relative' }}>
                    <SidebarNavigation />
                </div>
                <div className={styles.pane} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '20px', marginTop: '10px', width: '100%' }}>Home</h3>
                    <Feed posts={posts} />
                </div>
            </div>
        </div>
    );
}