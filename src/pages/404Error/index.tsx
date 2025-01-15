import { Link } from '@/components/Link';

import styles from './404.module.css';
import { HOME_PAGE_URL } from '@/constants';

export const Error404Page = () => {
  return (
    <main className={styles.Container}>
      <h1>404 - Страница не найдена</h1>
      <Link href={HOME_PAGE_URL}>Вернуться на главную</Link>
    </main>
  );
};
