import { useEffect, useState } from 'react';
import { ImagesGrid } from '@/components/ImagesGrid';
import { useTitle } from '@/hooks';

import styles from './home.module.css';
import { useInView } from 'react-intersection-observer';
import { useGetImages } from '@/api';

export const HomePage = () => {
  useTitle('Кошачий пинтерест');

  const { ref, inView } = useInView({ threshold: 0 });

  const [data, setData] = useState<string[]>([]);

  const query = useGetImages();

  useEffect(() => {
    if (inView) query.refetch();
  }, [inView]);

  return (
    <main>
      {!query.isLoading && <ImagesGrid ids={data} />}
      {(query.isLoading || query.isRefetching) && <div className={styles.Center}>... загружаем еще котиков ...</div>}
      {!query.isLoading && !query.isRefetching && !query.isError && (
        <div className={styles.Center} ref={ref}>
          <button onClick={() => query.refetch()}>Загрузить больше котиков</button>
        </div>
      )}
    </main>
  );
};
