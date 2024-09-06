import { Link } from '@/components/Link';
import styles from './header.module.css';
import { FAVORITES_PAGE_URL, HOME_PAGE_URL } from '@/shared/constants';
import { useLocation } from '@/shared/hooks';

export const Header = () => {
    const location = useLocation();

    return (
        <header className={styles.Header}>
            <nav className={styles.Nav}>
                <Link href={HOME_PAGE_URL}>
                    <div className={location === HOME_PAGE_URL ? styles.selected : ''}>Все котики</div>
                </Link>
                <Link href={FAVORITES_PAGE_URL}>
                    <div className={location === FAVORITES_PAGE_URL ? styles.selected : ''}>Любимые котики</div>
                </Link>
            </nav>
        </header>
    );
};
