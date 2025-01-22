'use client';
import Avatar from "@/styles/components/avatar/Avatar";
import styles from "./InlinePost.module.css";
import { GrChat, GrShareOption } from "react-icons/gr";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import moment from "moment";
import { Post } from "@/types/Post";
import Link from "next/link";
import NotFound from "@/styles/components/error/notFound/NotFound";
import ReplyBar from "@/app/[user]/post/[id]/components/replyBar/ReplyBar";
import { useRef, useState } from "react";

const shareUrl = 'http://localhost:3000/';
export default function InlinePost({ post, className, origin, reply, addArrowLength, addNewPost, globalReplyBarState, onReplyBarToggle, linking }: { post: Post, className?: string, origin?: boolean, reply?: boolean, addArrowLength?: (e: any) => void, addNewPost?: (post: Post) => void, globalReplyBarState?: string, onReplyBarToggle?: (postUuid: string) => void, linking?: boolean }) {
    const [likeState, setLikeState] = useState(post.hasLiked || false);
    const [bookmarkState, setBookmarkState] = useState(post.hasBookmarked || false);
    const [shareAmountState, setShareAmountState] = useState(post.shareAmount || 0);
    const [commentAmountState, setCommentAmountState] = useState(post.commentAmount || 0);

    if (!post || !post.existing) return <NotFound object="post" />;
    const ref = useRef<HTMLDivElement>(null);

    /**useEffect(() => {
        addArrowLength && addArrowLength(ref.current?.getBoundingClientRect().y);
    });**/

    const addNewPostWithRef = (p: Post) => {
        p.refPost = post;
        p.depth = (post.depth || 0) + 1;
        post.commentAmount = (post.commentAmount || 0) + 1;
        setCommentAmountState(post.commentAmount);
        console.log('New post comment amount', post.commentAmount);
        addNewPost && addNewPost(p);
    }

    const toggleLike = async () => {
        const newPost = { ...post };
        setLikeState(!likeState);
        post.likes = likeState ? (newPost.likes ?? 0) - 1 : (newPost.likes ?? 0) + 1;
        post.hasLiked = likeState;

        const response = await fetch(`/api/post/${post.uuid}/${likeState ? `dislike` : `like`}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!response.ok) { // revert like state if request failed
            const newPost = { ...post };
            setLikeState(!likeState);
            post.likes = likeState ? (newPost.likes ?? 0) - 1 : (newPost.likes ?? 0) + 1;
            post.hasLiked = likeState;
        }
    }

    const toggleBookmark = async () => {
        setBookmarkState(!bookmarkState);
        post.bookmarks = (post.bookmarks ?? 0) + (bookmarkState ? -1 : 1);
        post.hasBookmarked = bookmarkState;

        const response = await fetch(`/api/post/${post.uuid}/${bookmarkState ? `unbookmark` : `bookmark`}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!response.ok) { // revert bookmark state if request failed
            setBookmarkState(!bookmarkState);
            post.bookmarks = (post.bookmarks ?? 0) + (bookmarkState ? -1 : 1);
            post.hasBookmarked = bookmarkState;
        }
    }

    const shareOption = async () => {
        const shareData = {
            title: 'lifted - Social Media for everyone',
            text: `Check out ${post.authorDisplayname}'s post on lifted`,
            url: shareUrl + post.authorUsername + '/post/' + post.id,
        }

        let shareSuccess = true;
        try {
            await navigator.share(shareData);
        } catch (e) {
            shareSuccess = false;
        } finally {
            if(shareSuccess) {
                console.log('Shared successfully');
                fetch(`/api/post/${post.uuid}/share`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin'
                });
                post.shareAmount = (post.shareAmount ?? 0) + 1;
                setShareAmountState(post.shareAmount);
            }
        }
    }

    if (origin) {
        return (<div className={styles.inlinePost + " " + className} ref={ref}>
            <div className={styles.header}>
                <div className={styles.author}>
                    <Avatar src="https://avatars.githubusercontent.com/u/56507045?v=4" alt="avatar" />
                    <Link href={`/profile/@${post.authorUsername}`}><span>{post.authorDisplayname}</span></Link>
                </div>
                <div className={styles.date}>
                    <span title={(post.creationDate as Date).toLocaleString()}>{moment(post.creationDate).startOf("minutes").fromNow()}</span>
                </div>
            </div>
            <Link href={`/${post.authorUsername}/post/${post.id}`} style={{ pointerEvents: origin && !linking ? 'none' : 'initial' }} >
                <div className={styles.content}>
                    <p>{post.content}</p>
                </div>
            </Link>
            <div className={styles.actions}>
                <div className={styles.action + " " + styles.like + " " + (likeState && styles.active)} onClick={toggleLike}>
                    {likeState ? <FaHeart /> : <FaRegHeart />}
                    <span>{post.likes}</span>
                </div>
                <div className={styles.action}>
                    <GrChat />
                    <span>{post.commentAmount}</span>
                </div>
                <div className={styles.action + " " + styles.bookmark + " " + (bookmarkState && styles.active)} onClick={toggleBookmark}>
                    {bookmarkState ? <FaBookmark /> : <FaRegBookmark />}
                    <span>{post.bookmarks}</span>
                </div>
                <div className={styles.action} style={{ marginLeft: 'auto' }} onClick={shareOption}>
                    <GrShareOption />
                    <span>{shareAmountState}</span>
                </div>
            </div>
            <ReplyBar postUuid={post.uuid} addNewPost={addNewPostWithRef} />

        </div>);
    }

    return (
        <div className={styles.outerReplyBox} ref={ref}>
            <Avatar src="https://avatars.githubusercontent.com/u/56507045?v=4" alt="avatar" className={styles.replyAvatar} />
            <div className={styles.inlinePost + " " + className + " " + (reply && styles.widthLimit)}>
                <Link href={`/project/${post.authorUsername}/post/${post.id}`} style={{ pointerEvents: reply ? 'none' : 'initial' }} >
                    <div className={styles.content}>
                        <p>{post.content}</p>
                    </div>
                </Link>
                <div className={styles.actions}>
                    <div className={styles.action + " " + styles.like + " " + (likeState && styles.active)} onClick={toggleLike}>
                        {likeState ? <FaHeart /> : <FaRegHeart />}
                        <span>{post.likes}</span>
                    </div>
                    <div className={styles.action} onClick={() => { onReplyBarToggle && onReplyBarToggle(post.uuid!) }}>
                        <GrChat />
                        <span>{post.commentAmount}</span>
                    </div>
                    <div className={styles.action + " " + styles.bookmark + " " + (bookmarkState && styles.active)} onClick={toggleBookmark}>
                        {bookmarkState ? <FaBookmark /> : <FaRegBookmark />}
                        <span>{post.bookmarks}</span>
                    </div>
                    {!reply && <div className={styles.action} style={{ marginLeft: 'auto' }} onClick={shareOption} >
                        <GrShareOption />
                        <span>{shareAmountState}</span>
                    </div>}
                    {reply && <div className={styles.date}>
                        <span title={(post.creationDate as Date).toLocaleString()}>{moment(post.creationDate).startOf("minutes").fromNow()}</span>
                    </div>}
                </div>
                {(globalReplyBarState === post.uuid) && <ReplyBar postUuid={post.uuid} addNewPost={addNewPostWithRef} />}
            </div>
        </div>
    );
}