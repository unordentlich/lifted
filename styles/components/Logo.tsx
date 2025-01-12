import Image from 'next/image';

export default function Logo({ style, className }: { style?: React.CSSProperties, className?: string } ) {
    const imagePath = "/colored_logo.svg";

    const defaultStyle: React.CSSProperties = {
        height: 'auto',
    };

    style = { ...defaultStyle, ...style };

    return (
        <Image
            style={style}
            className={className}
            src={imagePath}
            alt="lifted Logo"
            width={200}
            height={200}
            priority
        />
    );
}