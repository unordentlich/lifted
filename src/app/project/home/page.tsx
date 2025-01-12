import SidebarNavigation from "@/styles/components/sidenav/SidebarNavigation";
import Navbar from "../../../../styles/components/navbar/Navbar";
import styles from "./page.module.css";
import Feed from "./components/feed/Feed";

export default function Login() {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Navbar />
            <div className={styles.flex}>
                <div style={{ width: '200px', position: 'relative' }}>
                    <SidebarNavigation />
                </div>
                <div className={styles.pane}>
                    <h3 style={{ marginBottom: '15px' }}>Home</h3>
                    <Feed />
                </div>
            </div>
        </div>
    );
}