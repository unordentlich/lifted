import styles from './NotFound.module.css';

export default function NotFound({object}: {object?: string}) {

    return (
        <div className={styles.container}>
            <h1 className={styles.errorCode}>404</h1>
            <h2 className={styles.errorText}>Not Found</h2>
            <p className={styles.errorDescription}>Sorry, the requested {object || 'content'} could not be found!</p>
        </div>
    );
}