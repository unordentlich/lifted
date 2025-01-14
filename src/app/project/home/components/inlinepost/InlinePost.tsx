import Avatar from "@/styles/components/avatar/Avatar";
import styles from "./InlinePost.module.css";
import { GrBookmark, GrChat, GrShareOption } from "react-icons/gr";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import moment from "moment";
import { Post } from "@/types/Post";
import Link from "next/link";


export default function InlinePost({ post }: { post: Post }) {
    const liked = false;
    console.log(post);

    return (
        <div className={styles.inlinePost}>
            <div className={styles.header}>
                <div className={styles.author}>
                    <Avatar src="https://avatars.githubusercontent.com/u/56507045?v=4" alt="avatar" />
                    <Link href={`/project/profile/@${post.authorUsername}`}><span>{post.authorDisplayname}</span></Link>
                </div>
                <div className={styles.date}>
                    <span title={new Date(post.creationDate).toLocaleString()}>{moment(new Date(post.creationDate)).startOf("minutes").fromNow()}</span>
                </div>
            </div>
            <div className={styles.content}>
                <p>{post.content}</p>
            </div>
            <div className={styles.actions}>
                <div className={styles.action + " " +  styles.like + " " + (liked && styles.active)}>
                    {liked ? <FaHeart /> : <FaRegHeart />}
                    <span>{post.likes}</span>
                </div>
                <div className={styles.action}>
                    <GrChat />
                    <span>{post.bookmarks}</span>
                </div>
                <div className={styles.action}>
                    <GrBookmark />
                    <span>{post.bookmarks}</span>
                </div>
                <div className={styles.action} style={{ marginLeft: 'auto' }}>
                    <GrShareOption />
                    <span>102</span>
                </div>
            </div>
        </div>
    );
}