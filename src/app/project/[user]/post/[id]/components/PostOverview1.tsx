'use client';
import InlinePost from '@/app/project/home/components/inlinepost/InlinePost';
import { Post } from '@/types/Post';
import styles from './Post.module.css';
import ReplyArrow from './replyArrow/ReplyArrow';
import { JSX, useState } from 'react';

export default function PostOverview({ posts }: { posts: Post[] }) {
    if (posts.length === 0) return <div>No posts found</div>;

    const [postsArray, setPostsArray] = useState(posts);
    const addNewPost = (post: Post) => {
        setPostsArray([post, ...postsArray]);
        setRerender(renderReplies(postsArray[0], postsArray));

    }

    const renderReplies = (parentPost: Post, posts: Post[]) => {
        const replies = posts.sort((a, b) => { 
            return new Date(a.creationDate || 0).getTime() - new Date(b.creationDate || 0).getTime(); 
        }).filter(post => post.refPost?.uuid === parentPost.uuid);
        console.log(replies);

        if (replies.length === 0) return null;

        let lastArrowPosition = 0;
        const arrowSpace = 25;
        let localArray: any[] = [], localArrowArray: any[] = [];
        replies.map(reply => {
            const [dynamicArrowHeight, setDynamicArrowHeight] = useState(0);
            const [visible, setVisible] = useState(0);
            const addArrowLength = (e: any) => {
                if (lastArrowPosition === 0) {
                    lastArrowPosition = e - 30;
                }
                let thisHeight = e - lastArrowPosition;
                lastArrowPosition = e + arrowSpace;
                setDynamicArrowHeight(thisHeight);
                setVisible(1);
            }

            let replyElement = <InlinePost post={reply} className={styles.replyCard} key={reply.uuid} reply addArrowLength={addArrowLength} addNewPost={addNewPost} />;

            localArrowArray.push(<ReplyArrow height={dynamicArrowHeight} visible={visible} />);
            localArray.push(replyElement);

            if (posts.filter(post => post.refPost?.uuid === reply.uuid).length > 0) {
                localArray.push(renderReplies(reply, posts));
            }
        });

        return (
            <div key={parentPost.uuid + '-container'} className={styles.bottomFlex + " " + styles[`depth${parentPost.depth}`]}>
                <div className={styles.verticalFlex + " " + styles.arrows} key={parentPost.uuid + "-arrowContainer"}>
                    {localArrowArray}
                </div>
                <div className={styles.verticalFlex + " " + styles.contentArea} key={parentPost.uuid + "-contentContainer"}>
                    {localArray}
                </div>
            </div>
        )
    };

    const [rerender, setRerender] = useState<JSX.Element | null>(null);
    return (
        <div>
            <InlinePost post={postsArray[0]} className={styles.originPostCard} origin addNewPost={addNewPost} />
            {rerender || renderReplies(postsArray[0], postsArray)}
        </div>
    );
}