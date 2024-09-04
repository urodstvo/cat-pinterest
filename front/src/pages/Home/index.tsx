import { useEffect, useState } from 'react';
import { ImagesGrid } from '@/widget/ImagesGrid';
import { getRandomImagesRequest } from '@/shared/api';
import { useTitle } from '@/shared/hooks';

import styles from './home.module.css';
import { ImagesResponse } from '@/shared/types/imagesResponse';
import { useInView } from 'react-intersection-observer';

export const HomePage = () => {
    const { ref, inView } = useInView({ threshold: 0 });

    useTitle('Cat Pinterest');

    const [page, setPage] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<ImagesResponse>([]);

    useEffect(() => {
        setIsSuccess(false);
        setIsError(false);
        setIsLoading(true);

        getRandomImagesRequest(page, 'thumb')
            .then((response) => {
                setData((prev) => [...prev, ...response]);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page]);

    useEffect(() => {
        if (inView) setPage((p) => ++p);
    }, [inView]);

    return (
        <main>
            {<ImagesGrid data={data} />}
            {isLoading && <div className={styles.Center}>... загружаем еще котиков ...</div>}
            {!isLoading && !isError && (
                <div className={styles.Center} ref={ref}>
                    <button onClick={() => setPage((p) => ++p)}>Загрузить больше котиков</button>
                </div>
            )}
        </main>
    );
};
