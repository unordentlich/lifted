import "@/styles/branding.css";
import Logo from "../Logo";
import styles from "./Navbar.module.css";
import Searchbar from "../searchbar/Searchbar";
import StatusAvatar from "../avatar/StatusAvatar";
import { Status } from "../avatar/StatusAvatar";


export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.flexContainer}>
                <Logo className={styles.logo} />
                
            </div>
            <Searchbar />
            <StatusAvatar src="https://avatars.githubusercontent.com/u/56507045?v=4" alt="avatar" style={{ height: '70%' }} status={Status.AWAY} />
        </nav>
    );
}