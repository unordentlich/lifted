import { Post } from "@/types/Post";
import InlinePost from "../inlinepost/InlinePost";
import styles from "./Feed.module.css";

export default function Feed({ posts }: { posts: Post[] }) {
    return (
        <div className={styles.feed}>
            {posts.map((post: any) => {
                return <InlinePost key={post.id} post={post} />;
            })}
        </div>
    );
}