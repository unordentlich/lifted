import "@/styles/branding.css";
import Link from "next/link";
import { GrMenu } from "react-icons/gr";
import StatusAvatar, { Status } from "../avatar/StatusAvatar";
import Logo from "../Logo";
import Searchbar from "../searchbar/Searchbar";
import styles from "./Navbar.module.css";
import { useStore } from "@/lib/stores/authenticatorStore";


export default function Navbar() {
    const { user } = useStore();
    console.log('got user', user);

    return (
        <nav className={styles.navbar}>
            {user && user.username}
            <div className={styles.flexContainer}>
                <Logo className={styles.logo} />
            </div>
            <Searchbar />
            <Link href="/profile" style={{ height: '70%' }}>
                <StatusAvatar src="https://avatars.githubusercontent.com/u/56507045?v=4" alt="avatar" status={Status.AWAY} className={styles.avatarBox} />
            </Link>
            <GrMenu className={styles.menuIcon} />
        </nav>
    );
}