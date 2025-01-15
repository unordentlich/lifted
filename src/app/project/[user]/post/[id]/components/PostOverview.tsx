import InlinePost from '@/app/project/home/components/inlinepost/InlinePost';
import styles from './Post.module.css';
import { Post } from '@/types/Post';
import ReplyBar from './replyBar/ReplyBar';
import ReplyArrow from './replyArrow/ReplyArrow';

export default function PostOverview({ originPost }: { originPost: Post }) {
    return (
        <div>
            <div>
                <InlinePost post={originPost} className={styles.originPostCard} linkDeactivated={true} />
                <ReplyBar />
                <ReplyArrow height={14} />
            </div>
        </div>
    )
}