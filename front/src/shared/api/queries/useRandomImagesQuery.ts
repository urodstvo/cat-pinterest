import { useEffect, useState } from 'react';
import { getRandomImagesRequest } from '../requests';
import { ImagesResponse } from '@/shared/types/imagesResponse';

export const useRandomImagesQuery = (
    page: number,
    size: 'thumb' | 'small' | 'med' | 'full' = 'med',
    limit: number = 15,
) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<ImagesResponse>([]);

    useEffect(() => {
        setIsLoading(true);
        getRandomImagesRequest(page, size, limit)
            .then((response) => {
                setData(response);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page, size, limit]);

    return {
        isSuccess,
        isLoading,
        isError,
        data,
    };
};
