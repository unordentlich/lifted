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

    const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const onImageEdit = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();
        new Promise((resolve, reject) => {
            input.onchange = (e) => {
                if (input.files && input.files.length > 0) {
                    resolve(toBase64(input.files[0]));
                } else {
                    reject('No file selected');
                }
            }
        }).then((value) => {
            fetch(`/api/profile/update`, {
                body: JSON.stringify({
                    profilePicture: value
                    }),
                method: 'PUT'
            }).then(res => res.json()).then(data => {
                console.log(data);
                setUser(data.newUser);
            });
        });
    }

    return (
        <div>
            <div className={styles.profileCard}>
                <div className={styles.profileCardTopArea}>
                    <div style={{ height: '70%', position: 'relative' }} className={styles.avatarContainer}>
                    {isOwner && <GrEdit className={styles.editAvatarIcon} onClick={() => { onImageEdit() }} />}
                    <Avatar src={`/api/image/${user.profilePicture}`} alt="avatar" />
                    </div>
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