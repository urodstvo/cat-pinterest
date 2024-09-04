import { CAT_API_KEY, CAT_API_URL } from '@/shared/constants/env';
import { ImagesResponse } from '@/shared/types/imagesResponse';

export const getRandomImagesRequest = async (
    page: number,
    size: 'thumb' | 'small' | 'med' | 'full' = 'med',
    limit: number = 15,
) => {
    const url = new URL(CAT_API_URL + '/images/search');
    const searchParams = new URLSearchParams();

    searchParams.append('limit', limit.toString());
    searchParams.append('page', page.toString());
    searchParams.append('size', size);
    searchParams.append('api_key', CAT_API_KEY);

    url.search = searchParams.toString();

    const api_url = url.toString();

    const response = await fetch(api_url);

    return (await response.json()) as ImagesResponse;
};
