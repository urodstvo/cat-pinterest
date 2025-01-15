import { Link } from '@/components/Link';

import styles from './404.module.css';

export const Error404Page = () => {
  return (
    <main className={styles.Container}>
      <h1>404 - Страница не найдена</h1>
      <Link href="/">Вернуться на главную</Link>
    </main>
  );
};
