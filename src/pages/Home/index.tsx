import { useEffect } from 'react';
import { ImagesGrid } from '@/components/images-grid';
import { useTitle } from '@/hooks';

import styles from './home.module.css';
import { useInView } from 'react-intersection-observer';
import { useGetImages } from '@/api';

export const HomePage = () => {
  useTitle('Кошачий пинтерест');

  const { ref, inView } = useInView({ threshold: 0 });

  const query = useGetImages();

  useEffect(() => {
    if (inView) query.fetchNextPage();
  }, [inView, query.fetchNextPage]);

  return (
    <main>
      {!query.isLoading && <ImagesGrid data={query.data?.pages.flatMap((p) => p.map((i) => i.id)) || []} />}
      {(query.isLoading || query.isRefetching || query.isFetchingNextPage) && (
        <div className={styles.Center}>... загружаем еще котиков ...</div>
      )}
      {!query.isLoading && !query.isRefetching && !query.isError && (
        <div
          className={styles.Center}
          ref={ref}
          style={{
            opacity: query.isLoading || query.isRefetching || query.isFetchingNextPage ? 0 : 1,
          }}
        >
          <button onClick={() => query.fetchNextPage()}>Загрузить больше котиков</button>
        </div>
      )}
    </main>
  );
};
