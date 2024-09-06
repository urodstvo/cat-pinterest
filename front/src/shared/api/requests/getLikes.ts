import { BACKEND_URL } from '@/shared/constants/env';

export const getLikesRequest = async () => {
    const token = localStorage.getItem('access_token');

    const url = new URL(BACKEND_URL + '/likes');

    return await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
