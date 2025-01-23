'use client';
import { Post } from "@/types/Post";
import InlinePost from "../inlinepost/InlinePost";
import styles from "./Feed.module.css";
import { GrRevert } from "react-icons/gr";
import { useId } from "react";

export default function Feed({ posts, markReplies }: { posts: Post[], markReplies?: boolean }) {
    return (
        <div className={styles.feed}>
            {posts.map((post: Post) => {
                return (
                    <div key={useId()}>
                        {(markReplies && post.isReply) ? <p style={{ color: 'gray', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', marginBottom: '5px' }}><GrRevert /> <b style={{fontWeight: '550'}}>Reply</b>on another post</p> : ''}
                        <InlinePost key={post.id} post={post} origin linking />
                    </div>
                );
            })}
        </div>
    );
}