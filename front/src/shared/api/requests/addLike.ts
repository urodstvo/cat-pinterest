import { BACKEND_URL } from '@/shared/constants/env';

export const addLikesRequest = async (catId: string) => {
    const url = new URL(BACKEND_URL + '/likes');

    const token = localStorage.getItem('access_token');

    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ catId }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};
