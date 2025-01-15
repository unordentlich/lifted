import Image from 'next/image';
import styles from './ReplyArrow.module.css';
import arrowSvg from '@assets/reply_arrow.svg';

export default function ReplyArrow({ height }: { height: number }) {

    return (
        <div className={styles.arrowContainer}>
            <div style={{ height: height + 'px' }} className={styles.arrowLine}></div>
            <Image src={arrowSvg} alt="reply arrow" priority width={20} className={styles.arrowEnd} />
        </div>
    );
}