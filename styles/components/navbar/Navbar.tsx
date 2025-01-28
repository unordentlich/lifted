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

    return (
        <nav className={styles.navbar}>
            <div className={styles.flexContainer}>
                <Logo className={styles.logo} />
            </div>
            <Searchbar />
            <Link href={`/profile/@${user.username}`} style={{ height: '70%' }}>
                <StatusAvatar src={`/api/image/${user.profile_picture}`} alt="avatar" status={Status.AWAY} className={styles.avatarBox} />
            </Link>
            <GrMenu className={styles.menuIcon} />
        </nav>
    );
}