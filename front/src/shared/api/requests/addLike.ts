import { BACKEND_URL } from '@/shared/constants/env';

export const addLikesRequest = async (catId: string) => {
    const token = localStorage.getItem('access_token');

    return await fetch(BACKEND_URL + '/likes', {
        method: 'POST',
        body: JSON.stringify({ catId }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};
