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
    authorProfilePicture?: string;
    views?: number;
    existing: boolean;
    refPost?: Post;
    depth?: number;
    hasLiked?: boolean;
    hasBookmarked?: boolean;
    commentAmount?: number;
    shareAmount?: number;
    isReply?: boolean;
}