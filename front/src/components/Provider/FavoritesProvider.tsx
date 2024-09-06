import { getLikesRequest } from '@/shared/api';
import { LikesResponse } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { useAuthActionsStore } from './AuthProvider';

const FavoritesContext = createContext<{ id: string; cat_id: string }[]>([]);

const token = localStorage.getItem('access_token');

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const setAuth = useAuthActionsStore();

    const query = useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            const res = await getLikesRequest();
            if (!res.ok)
                setAuth({
                    isAuthenticated: false,
                    token: '',
                });
            return (await res.json()) as LikesResponse;
        },
        enabled: !!token,
    });

    return (
        <FavoritesContext.Provider
            value={
                query.data?.map((i) => ({
                    id: i.id,
                    cat_id: i.cat_id,
                })) || []
            }
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavoritesStore = () => {
    const state = useContext(FavoritesContext);
    if (!state) throw new Error('useFavoritesStore must be used within a FavoritesProvider');

    return state;
};
