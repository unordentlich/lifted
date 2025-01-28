export interface User {
    uuid?: string;
    displayName?: string;
    userName?: string;
    email?: string;
    createdAt?: Date;
    profilePicture?: string;
    existing: boolean;
}