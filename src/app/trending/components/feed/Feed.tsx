'use client';
import { Post } from "@/types/Post";
import InlinePost from "../inlinepost/InlinePost";
import styles from "./Feed.module.css";
import { GrRevert } from "react-icons/gr";
import { useId, useState } from "react";
import PostCreationBox from "../creationbox/PostCreationBox";

export default function Feed({ posts, markReplies, includeCreationBox }: { posts: Post[], markReplies?: boolean, includeCreationBox?: boolean }) {
    const [postArray, setPostsArray] = useState(posts);
    return (
        <div className={styles.feed}>
            {includeCreationBox && <PostCreationBox addNewPost={(p) => {setPostsArray((prev) => [...prev, p])}} />}
            {postArray.sort((a, b) => new Date(b.creationDate!).getTime() - new Date(a.creationDate!).getTime()).map((post: Post) => {
                return (
                    <div key={post.uuid}>
                        {(markReplies && post.isReply) ? <p style={{ color: 'gray', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', marginBottom: '5px' }}><GrRevert /> <b style={{fontWeight: '550'}}>Reply</b>on another post</p> : ''}
                        <InlinePost key={post.id} post={post} origin linking />
                    </div>
                );
            })}
        </div>
    );
}