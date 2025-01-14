import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ style, className }: { style?: React.CSSProperties, className?: string }) {
    const imagePath = "/colored_logo.svg";

    const defaultStyle: React.CSSProperties = {
        height: 'auto',
    };

    style = { ...defaultStyle, ...style };

    return (
        <Link href="/project/home">
            <Image
                style={style}
                className={className}
                src={imagePath}
                alt="lifted Logo"
                width={200}
                height={200}
                priority
            />
        </Link>
    );
}