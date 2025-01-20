export interface Post {
    id?: number;
    uuid?: string;
    content?: string;
    likes?: number;
    bookmarks?: number;
    creationDate?: Date;
    authorUuid?: string;
    authorDisplayname?: string;
    authorUsername?: string;
    views?: number;
    existing: boolean;
    refPost?: Post;
    depth?: number;
    hasLiked?: boolean;
    hasBookmarked?: boolean;
    commentAmount?: number;
}