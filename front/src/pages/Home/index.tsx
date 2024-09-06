import { useEffect, useState } from 'react';
import { ImagesGrid } from '@/widget/ImagesGrid';
import { getImagesRequest } from '@/shared/api';
import { useTitle } from '@/shared/hooks';

import styles from './home.module.css';
import { ImagesResponse } from '@/shared/types/imagesResponse';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';

export const HomePage = () => {
    useTitle('Cat Pinterest');

    const { ref, inView } = useInView({ threshold: 0 });

    const [data, setData] = useState<string[]>([]);

    const query = useQuery({
        queryKey: ['images'],
        queryFn: async () => {
            const res = await getImagesRequest();
            if (!res.ok) throw new Error('');

            const data = (await res.json()) as ImagesResponse;
            setData((d) => [...d, ...data.map((i) => i.id)]);
            return data;
        },
        retry: false,
    });

    useEffect(() => {
        if (inView) query.refetch();
    }, [inView]);

    return (
        <main>
            {!query.isLoading && <ImagesGrid ids={data} />}
            {(query.isLoading || query.isRefetching) && (
                <div className={styles.Center}>... загружаем еще котиков ...</div>
            )}
            {!query.isLoading && !query.isRefetching && !query.isError && (
                <div className={styles.Center} ref={ref}>
                    <button onClick={() => query.refetch()}>Загрузить больше котиков</button>
                </div>
            )}
        </main>
    );
};
