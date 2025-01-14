import Image from 'next/image';
import styles from './Avatar.module.css';

export default function Avatar({ src, alt, className, style }: { src: string, alt: string, className?: string, style?: React.CSSProperties }) {
    const defaultClass = styles.avatar;
    
    if (className) {
        defaultClass.concat(className);
    }
    return (
        <Image
            src={src}
            alt={alt}
            className={defaultClass}
            style={style}
            width={200}
            height={200}
            priority
        />
    );
}