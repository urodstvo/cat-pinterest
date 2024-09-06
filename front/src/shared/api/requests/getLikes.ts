import { BACKEND_URL } from '@/shared/constants/env';

export const getLikesRequest = async () => {
    const token = localStorage.getItem('access_token');

    return await fetch(BACKEND_URL + '/likes', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
