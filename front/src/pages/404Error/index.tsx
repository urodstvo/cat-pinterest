import { Link } from '@/components/Link';

import styles from './404.module.css';

export const Error404Page = () => {
    return (
        <main className={styles.Container}>
            <h1>404 - Page not found</h1>
            <Link href="/">Go Home</Link>
        </main>
    );
};
