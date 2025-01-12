import SidebarNavigation from "@/styles/components/sidenav/SidebarNavigation";
import Navbar from "../../../../styles/components/navbar/Navbar";
import styles from "./page.module.css";

export default function Login() {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Navbar />
            <div className={styles.flex}>
                <div className={styles.pane}>
                    <SidebarNavigation />
                </div>
                <div className={styles.pane}>
                </div>
            </div>
        </div>
    );
}