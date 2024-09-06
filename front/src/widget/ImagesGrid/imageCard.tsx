import { createContext, useCallback, useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HeartOutlineIcon } from '@/shared/icons/heartOutline';
import { HeartFilledIcon } from '@/shared/icons/heartFilled';
import { FAVORITES_PAGE_URL } from '@/shared/constants';
import { addLikesRequest, deleteLikeRequest } from '@/shared/api';
import { LikeEntity } from '@/shared/types';

import { useAuthActionsStore, useAuthStore, useFavoritesStore } from '@/components/Provider';

import styles from './images-grid.module.css';

const ImageCardContext = createContext({
    isButtonDisabled: false,
    isFavorite: false,
    toggleFavorite: () => {},
});

export const ImageCard = ({ children, cat_id }: { children: React.ReactNode; cat_id: string }) => {
    const favorites = useFavoritesStore();
    const queryClient = useQueryClient();
    const setAuth = useAuthActionsStore();

    const { mutate: addLike, isPending: isAddPending } = useMutation({
        mutationFn: async (variables: { cat_id: string }) => {
            const res = await addLikesRequest(variables.cat_id);

            if (!res.ok) {
                if (res.status === 401)
                    setAuth({
                        isAuthenticated: false,
                        token: '',
                    });
                throw new Error('');
            }

            return (await res.json()) as LikeEntity;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });

    const { mutate: deleteLike, isPending: isDeletePending } = useMutation({
        mutationFn: async (variables: { likeId: string }) => {
            const res = await deleteLikeRequest(variables.likeId);
            if (!res.ok) {
                if (res.status === 401)
                    setAuth({
                        isAuthenticated: false,
                        token: '',
                    });
                throw new Error('');
            }

            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });

    return (
        <ImageCardContext.Provider
            value={{
                isButtonDisabled: isAddPending || isDeletePending,
                isFavorite: favorites.some((favorite) => favorite.cat_id === cat_id),
                toggleFavorite: favorites.some((favorite) => favorite.cat_id === cat_id)
                    ? () => deleteLike({ likeId: favorites.find((favorite) => favorite.cat_id === cat_id)!.id })
                    : () => addLike({ cat_id }),
            }}
        >
            <div className={styles.ImageCardContainer}>{children}</div>
        </ImageCardContext.Provider>
    );
};

export const CardImageContainer = ({ cat_id }: { cat_id: string }) => {
    return (
        <div className={styles.ImageContainer}>
            <img src={`https://cdn2.thecatapi.com/images/${cat_id}.jpg`} />
        </div>
    );
};

export const CardFooter = () => {
    const [isHovered, setIsHovered] = useState(false);
    const store = useAuthStore();
    const ctx = useContext(ImageCardContext);

    const handleClick = useCallback(() => {
        if (!store.isAuthenticated) {
            window.history.pushState(null, '', FAVORITES_PAGE_URL);
            window.dispatchEvent(new Event('popstate'));
        } else {
            ctx.toggleFavorite();
        }
    }, [store, ctx]);

    return (
        <div className={styles.ImageCardActions}>
            <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
                disabled={ctx.isButtonDisabled}
            >
                {ctx.isFavorite || isHovered ? <HeartFilledIcon /> : <HeartOutlineIcon />}
            </button>
        </div>
    );
};
