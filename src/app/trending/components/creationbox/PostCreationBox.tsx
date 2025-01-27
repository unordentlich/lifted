'use client';
import { GrAttachment } from 'react-icons/gr';
import styles from './PostCreationBox.module.css';
import { useRef } from 'react';
export default function PostCreationBox({addNewPost}: {addNewPost: (post: any) => void}) {
    const textarea = useRef<HTMLTextAreaElement>(null);

    const onPublish = async () => {
        const content = textarea.current?.value;
        if (!content) {
            return;
        }

        const response = await fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        if (response.status === 201) {
            const { post } = await response.json();
            addNewPost(post);
            textarea.current!.value = '';
        }
    }

    return (
        <div className={styles.container}>
            <textarea className={styles.textarea} placeholder="What's on your mind?" ref={textarea} />
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <div className={styles.attachementsButton}>
                    <GrAttachment size={12} />
                    <p>Add attachements</p>
                </div>
                <button className={styles.button + " " + styles.secondary}>Cancel</button>
                <button className={styles.button} onClick={onPublish}>Publish</button>
            </div>
        </div>
    );

}