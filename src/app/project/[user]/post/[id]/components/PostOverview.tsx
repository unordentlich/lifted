import InlinePost from '@/app/project/home/components/inlinepost/InlinePost';
import styles from './Post.module.css';
import { Post } from '@/types/Post';
import ReplyArrow from './replyArrow/ReplyArrow';

export default function PostOverview({ originPost }: { originPost: Post }) {
    return (
        <div>
            <InlinePost post={originPost} className={styles.originPostCard} origin />

            <div className={styles.bottomFlex}>
                <div className={styles.verticalFlex + " " + styles.arrows}>
                    <ReplyArrow height={30} />
                    <ReplyArrow height={75} />
                </div>
                <div className={styles.verticalFlex + " " + styles.contentArea}>
                    <InlinePost post={originPost} className={styles.originPostCard} reply />
                    <InlinePost post={originPost} className={styles.originPostCard} reply />
                    <div className={styles.bottomFlex} style={{marginLeft: '35px'}}>
                        <div className={styles.verticalFlex + " " + styles.arrows}>
                            <ReplyArrow height={20} />
                        </div>
                        <div className={styles.verticalFlex + " " + styles.contentArea} style={{paddingTop: '10px'}}>
                            <InlinePost post={originPost} className={styles.originPostCard} reply />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}