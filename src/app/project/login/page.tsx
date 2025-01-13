import Logo from "@/styles/components/Logo";
import styles from "./page.module.css";
import '@/styles/branding.css';
import { GrUser, GrFormLock } from "react-icons/gr";

export default function Login() {
    return (
        <div className={styles.container}>
            <Logo style={{ height: '65px' }} />
            <div className={styles.form}>
                <p className={styles.title}>Welcome back!</p>
                <p className={styles.sub}>Please log in using your account to access lifted</p>
                <form>
                    <div className={styles.inputIconGroup}>
                        <GrUser className={styles.icon} style={{height: '12px'}} />
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className={styles.inputIconGroup}>
                        <GrFormLock className={styles.icon} />
                        <input type="password" placeholder="Password" />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}