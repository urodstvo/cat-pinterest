import { BACKEND_URL } from '@/shared/constants/env';

export const authRequest = async (login: string, password: string) => {
    const url = new URL(BACKEND_URL + '/auth');

    return await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            login,
            password,
        }),
    });
};
