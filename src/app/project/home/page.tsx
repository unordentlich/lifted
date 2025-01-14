import styles from "./page.module.css";
import Feed from "./components/feed/Feed";

export default async function Login() {
    return (
        <div>
            <h3 style={{ marginBottom: '20px', marginTop: '10px', width: '100%' }}>Home</h3>
            <Feed posts={[]} />
        </div>

    );
}