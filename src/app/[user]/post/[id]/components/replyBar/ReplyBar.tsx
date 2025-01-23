'use client';

import { useId, useState } from 'react';
import styles from '../Post.module.css';
import { GrChat, GrSend } from 'react-icons/gr';
import { Post } from '@/types/Post';

export default function ReplyBar({ postUuid, addNewPost }: { postUuid?: string, addNewPost?: (post: Post) => void }) {
    const replyTextAreaId = useId();
    const [replyButtonDisabled, setReplyButtonDisabled] = useState(false);

    const autoGrow = (e: any) => {
        var element = e.target;
        const defaultHeight = 35;

        element.style.height = "auto";
        element.style.height = (element.scrollHeight > defaultHeight ? element.scrollHeight : defaultHeight) + 'px';

        if(element.value.split("\n").length > 1) {
            element.style.borderRadius = "10px";
        } else {
            element.style.borderRadius = "100px";
        }
    }

    const sendReply = async () => {
        const replyTextArea = (document.getElementById(replyTextAreaId) as HTMLTextAreaElement).value;
        if(replyTextArea.length === 0) return;

        replyButtonDisabled && setReplyButtonDisabled(true);

        const response = await fetch(`/api/post/${postUuid}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: replyTextArea }),
        });

        let data = await response.json();
        let post: Post = {
            uuid: data.reply.uuid,
            id: data.reply.id,
            content: data.reply.content,
            creationDate: new Date(data.reply.creationDate),
            existing: true,
            likes: 0,
            bookmarks: 0,
            commentAmount: 0,
        };
        addNewPost && addNewPost(post);

        (document.getElementById(replyTextAreaId) as HTMLTextAreaElement).value = '';
        setReplyButtonDisabled(false);
    }

    return (
        <div className={styles.replyBar} >
            <GrChat className={styles.replyIcon} />
            <textarea rows={1} onInput={autoGrow} placeholder="Reply to this post" id={replyTextAreaId}  />
            <button onClick={sendReply} disabled={replyButtonDisabled} >
                <GrSend />
            </button>
        </div>
    );
}