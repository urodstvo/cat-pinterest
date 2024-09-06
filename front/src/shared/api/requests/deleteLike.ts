import { BACKEND_URL } from '@/shared/constants/env';

export const deleteLikeRequest = async (likeId: string) => {
    const token = localStorage.getItem('access_token');

    return await fetch(BACKEND_URL + '/likes/' + likeId, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
