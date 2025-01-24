'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Logo({ style, className, deactivateResize }: { style?: React.CSSProperties, className?: string, deactivateResize?: boolean }) {
    const imagePath = "/colored_logo.svg";
    const smallImagePath = "/colored_logo_small.svg";
    const [largeLogo, setLargeLogo] = useState(true);

    const defaultStyle: React.CSSProperties = {
        height: 'auto',
        scale: largeLogo ? 1 : 0.7,
    };

    style = { ...defaultStyle, ...style };

    const handleResize =  (matches: boolean) => {
        setLargeLogo(!matches);
    }

    useEffect(() => {
        if(deactivateResize) return;
        const matchMedia = window.matchMedia("(max-width:768px)");
        matchMedia.addEventListener('change', () => handleResize(matchMedia.matches));
        return () => matchMedia.removeEventListener('change', () => handleResize(matchMedia.matches));
      }, []);

    return (
        <Link href="/home">
            <Image
                style={style}
                className={className}
                src={largeLogo ? imagePath : smallImagePath}
                alt="lifted Logo"
                width={200}
                height={200}
                priority
            />
        </Link>
    );
}