import Logo from "@/styles/components/Logo";
import styles from "./page.module.css";
import '@/styles/branding.css';
import variables from '@/lib/variables';
import LoginForm from "./components/LoginForm";

export default function Login() {
    return (
        <div className={styles.container}>
            <Logo style={{ height: '65px' }} />
            <div className={styles.form}>
                <p className={styles.title}>Welcome back!</p>
                <p className={styles.sub}>Please log in using your account to access lifted</p>
                <LoginForm />
            </div>
            <div className={styles.footer}>
                <p>Version {variables.version}</p>
            </div>
        </div>
    );
}