import Navbar from "@/styles/components/navbar/Navbar";
import styles from './page.module.css';
import Avatar from "@/styles/components/avatar/Avatar";

export default function ProjectProfilePage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar />
            <div className={styles.flexContainer}>
                <div className={styles.container}>
                    <div className={styles.profileCard}>
                        <div className={styles.profileCardTopArea}>
                            <Avatar src="https://avatars.githubusercontent.com/u/56507045?v=4" alt="avatar" style={{ height: '70%' }} />
                            <div className={styles.nameInformation}>
                                <h4 className={styles.profileName}>John Doe</h4>
                                <h4 className={styles.profileUsername}>@john</h4>
                            </div>
                        </div>
                        <div className={styles.profileCardBottomArea}>
                            <div className={styles.cardItem}>
                                <h4 className={styles.cardItemTitle}>Posts</h4>
                                <h4 className={styles.cardItemValue}>928</h4>
                            </div>
                            <div className={styles.cardItem}>
                                <h4 className={styles.cardItemTitle}>Follower</h4>
                                <h4 className={styles.cardItemValue}>28</h4>
                            </div>
                            <div className={styles.cardItem}>
                                <h4 className={styles.cardItemTitle}>Likes</h4>
                                <h4 className={styles.cardItemValue}>289</h4>
                            </div>
                            <div className={styles.cardItem}>
                                <h4 className={styles.cardItemTitle}>Views</h4>
                                <h4 className={styles.cardItemValue}>28K</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}