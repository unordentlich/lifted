import InlinePost from '@/app/project/home/components/inlinepost/InlinePost';
import styles from './Post.module.css';
import { Post } from '@/types/Post';
import { GrChat, GrSend } from 'react-icons/gr';

export default function PostOverview({ originPost }: { originPost: Post }) {
    return (
        <div>
            <div>
                <InlinePost post={originPost} className={styles.originPostCard} linkDeactivated={true} />
                <div className={styles.replyBar}>
                    <GrChat className={styles.replyIcon}  />
                    <input type="text" placeholder="Reply to this post" />
                    <button>
                        <GrSend/>
                    </button>
                </div>
            </div>
        </div>
    )
}