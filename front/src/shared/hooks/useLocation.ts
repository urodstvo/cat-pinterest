import { useSyncExternalStore } from 'react';

const getSnapshot = () => window.location.pathname;

const subscribe = (callback: () => void) => {
    const handle = () => {
        callback();

        return window.location.pathname;
    };

    window.addEventListener('popstate', handle);
    return () => window.removeEventListener('popstate', handle);
};

export const useLocation = () => {
    return useSyncExternalStore(subscribe, getSnapshot);
};
