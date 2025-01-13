import InlinePost from "../inlinepost/InlinePost";
import styles from "./Feed.module.css";

export default function Feed({ posts }: { posts: any[] }) {
    return (
        <div className={styles.feed}>
            {posts.map((post: any) => {
                console.log(post);
                return <InlinePost key={post.id} post={post} />;
            })}
        </div>
    );
}