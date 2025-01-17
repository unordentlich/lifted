import InlinePost from '@/app/project/home/components/inlinepost/InlinePost';
import { Post } from '@/types/Post';
import styles from './Post.module.css';
import ReplyArrow from './replyArrow/ReplyArrow';

export default function PostOverview({ posts }: { posts: Post[] }) {
    if (posts.length === 0) return <div>No posts found</div>;

    const originPost = posts[0];

    const renderReplies = (parentPost: Post, posts: Post[]) => {
        const replies = posts.filter(post => post.refPost?.uuid === parentPost.uuid);

        if (replies.length === 0) return null;

        let arrowCalculator = 30;
        let localArray: any[] = [], localArrowArray: any[] = [];
        replies.map(reply => {
            let replyElement = <InlinePost post={reply} className={styles.replyCard} key={reply.uuid} reply />;

            localArrowArray.push(<ReplyArrow height={arrowCalculator} />);
            localArray.push(replyElement);

            if (posts.filter(post => post.refPost?.uuid === reply.uuid).length > 0) {
                localArray.push(renderReplies(reply, posts));
            }
        });

        return (
            <div key={parentPost.uuid + '-container'} className={styles.bottomFlex}>
                <div className={styles.verticalFlex + " " + styles.arrows} key={parentPost.uuid + "-arrowContainer"}>
                    {localArrowArray}
                </div>
                <div className={styles.verticalFlex + " " + styles.contentArea} key={parentPost.uuid + "-contentContainer"}>
                    {localArray}
                </div>
            </div>
        )
    };

    return (
        <div>
            <InlinePost post={originPost} className={styles.originPostCard} origin />
            {renderReplies(originPost, posts)}
        </div>
    );
}