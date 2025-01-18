'use client';
import InlinePost from '@/app/project/home/components/inlinepost/InlinePost';
import { Post } from '@/types/Post';
import styles from './Post.module.css';
import ReplyArrow from './replyArrow/ReplyArrow';
import { JSX, useState } from 'react';

export default function PostOverview({ posts }: { posts: Post[] }) {
    if (posts.length === 0) return <div>No posts found</div>;
    const originPost = posts.filter((post) => post.depth === 0)[0];

    const [postsArray, setPostsArray] = useState(posts);
    const [arrowStates, setArrowStates] = useState<{ [key: string]: { height: number; visible: boolean } }>({});

    const addNewPost = (post: Post) => {
        let newPostsArray = [...postsArray, post];
        console.log(newPostsArray);
        setPostsArray(newPostsArray);
        setRerender(renderReplies(originPost, newPostsArray));
    };

    const renderReplies = (parentPost: Post, posts: Post[]) => {
        const replies = posts
            .sort((a, b) => new Date(b.creationDate!).getTime() - new Date(a.creationDate!).getTime())
            .filter((post) => post.refPost?.uuid === parentPost.uuid);

        if (replies.length === 0) return null;

        let lastArrowPosition = 0;
        const arrowSpace = 25;

        const localArray: any[] = [];
        const localArrowArray: any[] = [];
        replies.forEach((reply) => {
            const arrowKey = `${reply.uuid}-arrow`;

            const arrowState = arrowStates[arrowKey] || { height: 0, visible: false };

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

            localArrowArray.push(
                <ReplyArrow
                    key={arrowKey}
                    height={arrowState.height}
                    visible={arrowState.visible ? 1 : 0}
                />
            );

            localArray.push(
                <InlinePost
                    key={reply.uuid}
                    post={reply}
                    className={styles.replyCard}
                    reply
                    addArrowLength={addArrowLength}
                    addNewPost={addNewPost}
                />
            );

            if (posts.filter((post) => post.refPost?.uuid === reply.uuid).length > 0) {
                localArray.push(renderReplies(reply, posts));
            }
        });

        return (
            <div
                key={`${parentPost.uuid}-container`}
                className={styles.bottomFlex + ' ' + styles[`depth${parentPost.depth}`]}
            >
                <div
                    className={styles.verticalFlex + ' ' + styles.arrows}
                    key={`${parentPost.uuid}-arrowContainer`}
                >
                    {localArrowArray}
                </div>
                <div
                    className={styles.verticalFlex + ' ' + styles.contentArea}
                    key={`${parentPost.uuid}-contentContainer`}
                >
                    {localArray}
                </div>
            </div>
        );
    };

    const [rerender, setRerender] = useState<JSX.Element | null>(renderReplies(originPost, postsArray));
    return (
        <div>
            <InlinePost
                post={originPost}
                className={styles.originPostCard}
                origin
                addNewPost={addNewPost}
            />
            {rerender}
        </div>
    );
}
