import SidebarNavigation from "@/styles/components/sidenav/SidebarNavigation";
import Navbar from "../../../../styles/components/navbar/Navbar";
import styles from "./page.module.css";
import Feed from "./components/feed/Feed";

export default function Login() {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Navbar />
            <div className={styles.flex}>
                <div style={{ position: 'relative' }}>
                    <SidebarNavigation />
                </div>
                <div className={styles.pane} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '20px', marginTop: '10px', width: '100%' }}>Home</h3>
                    <Feed />
                </div>
            </div>
        </div>
    );
}