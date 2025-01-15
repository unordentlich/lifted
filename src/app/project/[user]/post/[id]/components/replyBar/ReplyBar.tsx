'use client';

import styles from '../Post.module.css';
import { GrChat, GrSend } from 'react-icons/gr';

export default function ReplyBar() {

    const autoGrow = (e: any) => {
        var element = e.target;
        const defaultHeight = 35;

        console.log(element.scrollHeight);

        element.style.height = "auto";
        element.style.height = (element.scrollHeight > defaultHeight ? element.scrollHeight : defaultHeight) + 'px';

        if(element.value.split("\n").length > 1) {
            element.style.borderRadius = "10px";
        } else {
            element.style.borderRadius = "100px";
        }
    }

    return (
        <div className={styles.replyBar} >
            <GrChat className={styles.replyIcon} />
            <textarea rows={1} onInput={autoGrow} placeholder="Reply to this post" />
            <button>
                <GrSend />
            </button>
        </div>
    );
}