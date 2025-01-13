import Logo from "@/styles/components/Logo";
import styles from "./page.module.css";
import '@/styles/branding.css';

export default function Login() {
    return (
        <div className={styles.container}>
            <Logo style={{height: '65px'}} />
            <div className={styles.form}>
                <p className={styles.title}>Welcome back!</p>
                <p className={styles.sub}>Please log in using your account to access lifted</p>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}