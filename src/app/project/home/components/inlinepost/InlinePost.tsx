import Avatar from "@/styles/components/avatar/Avatar";
import styles from "./InlinePost.module.css";
import { GrBookmark, GrChat, GrShareOption } from "react-icons/gr";
import { FaRegHeart, FaHeart } from "react-icons/fa";


export default function InlinePost() {
    const liked = false;

    return (
        <div className={styles.inlinePost}>
            <div className={styles.header}>
                <div className={styles.author}>
                    <Avatar src="https://avatars.githubusercontent.com/u/56507045?v=4" alt="avatar" />
                    <span>jonas</span>
                </div>
                <div className={styles.date}>
                    <span>2 hours ago</span>
                </div>
            </div>
            <div className={styles.content}>
                <p>Hey, I'm working on a new project and I need some help. It's called lifted!</p>
                <img src="https://www.visittheusa.de/sites/default/files/styles/hero_l/public/images/hero_media_image/2016-12/NYC-Underrated-Parks-HERO.jpg?h=7abc3870&itok=Q4bHIuv4" alt="project" />
            </div>
            <div className={styles.actions}>
                <div className={styles.action + " " +  styles.like + " " + (liked && styles.active)}>
                    {liked ? <FaHeart /> : <FaRegHeart />}
                    <span>225</span>
                </div>
                <div className={styles.action}>
                    <GrChat />
                    <span>31</span>
                </div>
                <div className={styles.action}>
                    <GrBookmark />
                    <span>12</span>
                </div>
                <div className={styles.action} style={{ marginLeft: 'auto' }}>
                    <GrShareOption />
                    <span>102</span>
                </div>
            </div>
        </div>
    );
}