export interface Post {
    id?: number;
    content?: string;
    likes?: number;
    bookmarks?: number;
    creationDate?: Date;
    authorUuid?: string;
    authorDisplayname?: string;
    authorUsername?: string;
    views?: number;
    existing: boolean;
}