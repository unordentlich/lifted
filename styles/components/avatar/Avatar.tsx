'use client';
import Image from 'next/image';
import styles from './Avatar.module.css';
import { useState } from 'react';

export default function Avatar({ src, alt, className, style }: { src: string, alt: string, className?: string, style?: React.CSSProperties }) {
    const defaultClass = styles.avatar;
    const [srcState, setSrcState] = useState(src);
    return (
        <Image
            src={srcState}
            onError={() => {setSrcState('/user_placeholder.png')}}
            alt={alt}
            className={defaultClass + " " + className}
            style={style}
            width={200}
            height={200}
            priority
        />
    );
}