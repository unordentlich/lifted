import styles from '../page.module.css';
import Avatar from "@/styles/components/avatar/Avatar";
import Feed from "../../../home/components/feed/Feed";
import { User } from '@/types/User';
import NotFound from '@/styles/components/error/notFound/NotFound';
import { Post } from '@/types/Post';

export default async function Profile({ user, posts, postAmount, likesAmount, followerAmount, viewAmount }: { user: User, posts: Post[], postAmount: number, likesAmount: number, followerAmount: number, viewAmount: number }) { 
    if (!user.existing) return <div style={{display: 'flex', alignItems: 'center', height: '100%'}}><NotFound object='profile' /></div>;

    return (
        <div>
            <div className={styles.profileCard}>
                <div className={styles.profileCardTopArea}>
                    <Avatar src="https://avatars.githubusercontent.com/u/56507045?v=4" alt="avatar" style={{ height: '70%' }} />
                    <div className={styles.nameInformation}>
                        <h4 className={styles.profileName}>{user.displayName}</h4>
                        <h4 className={styles.profileUsername}>@{user.userName}</h4>
                    </div>
                </div>
                <div className={styles.profileCardBottomArea}>
                    <div className={styles.cardItem}>
                        <h4 className={styles.cardItemTitle}>Posts</h4>
                        <h4 className={styles.cardItemValue}>{postAmount}</h4>
                    </div>
                    <div className={styles.cardItem}>
                        <h4 className={styles.cardItemTitle}>Follower</h4>
                        <h4 className={styles.cardItemValue}>{formatStatistics(followerAmount)}</h4>
                    </div>
                    <div className={styles.cardItem}>
                        <h4 className={styles.cardItemTitle}>Likes</h4>
                        <h4 className={styles.cardItemValue}>{formatStatistics(likesAmount)}</h4>
                    </div>
                    <div className={styles.cardItem}>
                        <h4 className={styles.cardItemTitle}>Views</h4>
                        <h4 className={styles.cardItemValue}>{formatStatistics(viewAmount)}</h4>
                    </div>
                </div>
            </div>
            <h4 style={{ marginBottom: '15px' }}>Recent posts</h4>
            <Feed posts={posts} />
        </div>
    );
}

function formatStatistics(value: number) {
    return (value > 1000) ? (value > 1000000 ? `${(value / 1000000).toFixed(0)}M` : `${(value / 1000).toFixed(0)}K`) : value;
}