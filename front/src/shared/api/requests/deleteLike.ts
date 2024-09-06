import { BACKEND_URL } from '@/shared/constants/env';

export const deleteLikeRequest = async (likeId: string) => {
    const url = new URL(BACKEND_URL + '/likes/' + likeId);

    const token = localStorage.getItem('access_token');

    return await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
