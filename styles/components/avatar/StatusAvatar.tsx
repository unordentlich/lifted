import Avatar from './Avatar';
import styles from './Avatar.module.css';

export default function StatusAvatar({ src, alt, className, style, status }: { src: string, alt: string, className?: string, style?: React.CSSProperties, status: Status }) {
    return (
        <div className={styles.avatarContainer + " " + className}>
            <Avatar src={src} alt={alt} style={style} />
            <div style={{backgroundColor: status}} className={styles.statusPoint} />
        </div>

    );
}

export enum Status {
    ONLINE = "green",
    OFFLINE = "red",
    AWAY = "#f59c00",
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    BUSY = "red"
}