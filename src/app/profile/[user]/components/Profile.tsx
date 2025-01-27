'use client';
import styles from '../page.module.css';
import Avatar from "@/styles/components/avatar/Avatar";
import Feed from "../../../trending/components/feed/Feed";
import { User } from '@/types/User';
import NotFound from '@/styles/components/error/notFound/NotFound';
import { Post } from '@/types/Post';
import { GrEdit } from 'react-icons/gr';
import { useRef, useState } from 'react';
import { useStore } from '@/lib/stores/authenticatorStore';

export default function Profile({ user, posts, postAmount, likesAmount, followerAmount, viewAmount }: { user: User, posts: Post[], postAmount: number, likesAmount: number, followerAmount: number, viewAmount: number }) {
    if (!user.existing) return <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}><NotFound object='profile' /></div>;
    const {setUser} = useStore();

    const usernameRef = useRef<HTMLHeadingElement>(null);
    const displayNameRef = useRef<HTMLHeadingElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isOwner] = useState(user.uuid === useStore().user.uuid);

    const onEditCancel = () => {
        setIsEditing(false);
        usernameRef.current!.innerText = user.userName as string;
        displayNameRef.current!.innerText = user.displayName as string;
    };

    const onEditSubmit = () => {
        setIsEditing(false);
        fetch(`/api/profile/update`, {
            body: JSON.stringify({
                username: usernameRef.current?.innerText,
                displayName: displayNameRef.current?.innerText
            }),
            method: 'PUT'
        }).then(res => res.json()).then(data => {
            setUser(data.newUser);
        });
    }

    const onClickEdit = (ref: any) => {
        var otherRef = ref === usernameRef ? displayNameRef : usernameRef;
        ref.current.contentEditable = 'true';
        ref.current.focus();
        setIsEditing(true);
        ref.current.onblur = () => {
            ref.current.contentEditable = 'false';
            if (ref === usernameRef && ref.current.innerText.length <= 1) {
                ref.current.innerText = user.userName;
            }
            if(displayNameRef.current?.innerText === user.displayName && usernameRef.current?.innerText === user.userName) {
                setIsEditing(false);
            }
        }
        if (otherRef.current !== null) {
            otherRef.current.contentEditable = 'false';
        }
    };

    return (
        <div>
            <div className={styles.profileCard}>
                <div className={styles.profileCardTopArea}>
                    <Avatar src="https://avatars.githubusercontent.com/u/56507045?v=4" alt="avatar" style={{ height: '70%' }} />
                    <div className={styles.nameInformation}>
                        <h4 className={styles.profileName}><span ref={displayNameRef}>{user.displayName}</span> {isOwner && <GrEdit className={styles.editIcon} onClick={() => { onClickEdit(displayNameRef) }} />}</h4>
                        <h4 className={styles.profileUsername}>@<span ref={usernameRef}>{user.userName}</span> {isOwner && <GrEdit className={styles.editIcon} onClick={() => { onClickEdit(usernameRef) }} />}</h4>
                    </div>
                    {
                        isEditing &&
                        <div className={styles.profileEditActions}>
                            <button className={styles.editButton} onClick={onEditCancel}>Cancel</button>
                            <button className={styles.editButton} onClick={onEditSubmit}>Save</button>
                        </div>
                    }
                </div>
                <div className={styles.profileCardBottomArea}>
                    <div className={styles.cardItem}>
                        <h4 className={styles.cardItemTitle}>Posts</h4>
                        <h4 className={styles.cardItemValue}>{postAmount}</h4>
                    </div>
                    <div className={styles.cardItem}>
                        <h4 className={styles.cardItemTitle}>Follower</h4>
                        <h4 className={styles.cardItemValue}>{formatStatistics(followerAmount)}</h4>
                    </div>
                    <div className={styles.cardItem}>
                        <h4 className={styles.cardItemTitle}>Likes</h4>
                        <h4 className={styles.cardItemValue}>{formatStatistics(likesAmount)}</h4>
                    </div>
                    <div className={styles.cardItem}>
                        <h4 className={styles.cardItemTitle}>Views</h4>
                        <h4 className={styles.cardItemValue}>{formatStatistics(viewAmount)}</h4>
                    </div>
                </div>
            </div>
            <h4 style={{ marginBottom: '15px' }}>Recent posts</h4>
            <Feed posts={posts} />
        </div>
    );
}

function formatStatistics(value: number) {
    return (value > 1000) ? (value > 1000000 ? `${(value / 1000000).toFixed(0)}M` : `${(value / 1000).toFixed(0)}K`) : value;
}