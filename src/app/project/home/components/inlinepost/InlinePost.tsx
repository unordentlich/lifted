import Avatar from "@/styles/components/avatar/Avatar";
import styles from "./InlinePost.module.css";
import { GrBookmark, GrChat, GrShareOption } from "react-icons/gr";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import moment from "moment";
import { Post } from "@/types/Post";
import Link from "next/link";
import NotFound from "@/styles/components/error/notFound/NotFound";


export default function InlinePost({ post, className, linkDeactivated }: { post: Post, className: string, linkDeactivated?: boolean }) {
    const liked = false;

    if(!post || !post.existing) return <NotFound object="post" />;


    return (
        <div className={styles.inlinePost + " " + className}>
            <div className={styles.header}>
                <div className={styles.author}>
                    <Avatar src="https://avatars.githubusercontent.com/u/56507045?v=4" alt="avatar" />
                    <Link href={`/project/profile/@${post.authorUsername}`}><span>{post.authorDisplayname}</span></Link>
                </div>
                <div className={styles.date}>
                    <span title={(post.creationDate as Date).toLocaleString()}>{moment(post.creationDate).startOf("minutes").fromNow()}</span>
                </div>
            </div>
            <Link href={`/project/${post.authorUsername}/post/${post.id}`} style={{pointerEvents: linkDeactivated ? 'none' : 'initial'}} >
            <div className={styles.content}>
                <p>{post.content}</p>
            </div>
            </Link>
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