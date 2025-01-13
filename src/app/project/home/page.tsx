import SidebarNavigation from "@/styles/components/sidenav/SidebarNavigation";
import Navbar from "../../../../styles/components/navbar/Navbar";
import styles from "./page.module.css";
import Feed from "./components/feed/Feed";
import pool from '@/lib/database';

export default async function Login() {
    const posts = [];

    try {
        if (pool) {
            const [rows]: any[] = await pool.execute('SELECT * FROM posts');
            for (const row of rows) {
                posts.push(row);
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