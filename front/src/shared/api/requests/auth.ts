import { BACKEND_URL } from '@/shared/constants/env';

export const authRequest = async (login: string, password: string) => {
    return await fetch(BACKEND_URL + '/auth', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            login,
            password,
        }),
    });
};
