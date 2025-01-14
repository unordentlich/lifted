import InlinePost from '@/app/project/home/components/inlinepost/InlinePost';
import styles from './Post.module.css';
import { Post } from '@/types/Post';

export default function PostOverview({ originPost }: { originPost: Post }) {
    return (
        <div>
            <InlinePost post={originPost} />
        </div>
    )
}