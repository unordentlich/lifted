'use client';
import InlinePost from '@/app/project/home/components/inlinepost/InlinePost';
import { Post } from '@/types/Post';
import styles from './Post.module.css';
import ReplyArrow from './replyArrow/ReplyArrow';
import { useState, useMemo } from 'react';

/**
 * Note: The arrow calculation got built mainly by the use of artificial intelligence (ChatGPT) due to its complexity :')
 */
export default function PostOverview({ posts }: { posts: Post[] }) {
    if (posts.length === 0) return <div>No posts found</div>;
    const originPost = posts.find((post) => post.depth === 0);

    const [postsArray, setPostsArray] = useState(posts);
    const [arrowStates, setArrowStates] = useState<{ [key: string]: { height: number; visible: boolean } }>({});

    const addNewPost = (parentPost: Post, post: Post) => {
        setPostsArray((prevPosts) => [...prevPosts, post]);
        parentPost.commentAmount = (parentPost.commentAmount || 0) + 1;
    };

    const renderReplies = (parentPost: Post) => { // backup function without arrows
        const replies = postsArray
            .filter((post) => post.refPost?.uuid === parentPost.uuid)
            .sort((a, b) => new Date(b.creationDate!).getTime() - new Date(a.creationDate!).getTime());

        if (replies.length === 0) return null;

        return (
            <div
                key={`${parentPost.uuid}-container`}
                className={styles.bottomFlex + ' ' + styles[`depth${parentPost.depth}`]}
            >
                <div className={styles.verticalFlex}>
                    {replies.map((reply) => (
                        <div key={reply.uuid}>
                            <InlinePost
                                key={reply.uuid}
                                post={reply}
                                className={styles.replyCard}
                                reply
                                addNewPost={(post) => addNewPost(parentPost, post)}
                            />
                            {renderReplies(reply)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    /**const renderReplies = (parentPost: Post) => {
        const replies = postsArray
            .filter((post) => post.refPost?.uuid === parentPost.uuid)
            .sort((a, b) => new Date(b.creationDate!).getTime() - new Date(a.creationDate!).getTime());

        if (replies.length === 0) return null;

        let lastArrowPosition = 0;
        const arrowSpace = 25;

        return (
            <div
                key={`${parentPost.uuid}-container`}
                className={styles.bottomFlex + ' ' + styles[`depth${parentPost.depth}`]}
            >
                <div className={styles.verticalFlex + ' ' + styles.arrows}>
                    {replies.map((reply, index) => {
                        const arrowKey = `${reply.uuid}-arrow`;
                        const arrowState = arrowStates[arrowKey] || { height: 0, visible: false };

                        return (
                            <ReplyArrow
                                key={arrowKey}
                                height={arrowState.height}
                                visible={arrowState.visible ? 1 : 0}
                            />
                        );
                    })}
                </div>
                <div className={styles.verticalFlex + ' ' + styles.contentArea}>
                    {replies.map((reply) => {
                        const arrowKey = `${reply.uuid}-arrow`;

                        const addArrowLength = (e: number) => {
                            if (lastArrowPosition === 0) {
                                lastArrowPosition = e - 30;
                            }
                            const thisHeight = e - lastArrowPosition;
                            lastArrowPosition = e + arrowSpace;

                            setArrowStates((prev) => ({
                                ...prev,
                                [arrowKey]: { height: thisHeight, visible: true },
                            }));
                        };

                        return (
                            <div key={reply.uuid}>
                                <InlinePost
                                    post={reply}
                                    className={styles.replyCard}
                                    reply
                                    addArrowLength={addArrowLength}
                                    addNewPost={addNewPost}
                                />
                                {renderReplies(reply)}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };**/

    const renderedReplies = useMemo(() => renderReplies(originPost!), [postsArray]); // removed arrowStates from memo deps due to massive lags

    return (
        <div>
            {originPost && (
                <InlinePost
                    post={originPost}
                    className={styles.originPostCard}
                    origin
                    addNewPost={(post) => addNewPost(originPost, post)}
                />
            )}
            {renderedReplies}
        </div>
    );
}
