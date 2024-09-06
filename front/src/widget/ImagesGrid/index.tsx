import { memo, useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HeartOutlineIcon } from '@/shared/icons/heartOutline';
import { HeartFilledIcon } from '@/shared/icons/heartFilled';
import { useAuthActionsStore, useFavoritesStore, useAuthStore } from '@/components/Provider';
import { addLikesRequest, deleteLikeRequest } from '@/shared/api';
import { LikeEntity } from '@/shared/types';

import styles from './images-grid.module.css';
import { FAVORITES_PAGE_URL } from '@/shared/constants';

const HeartButton = ({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    const store = useAuthStore();

    const handleClick = useCallback(() => {
        if (!store.isAuthenticated) {
            window.history.pushState(null, '', FAVORITES_PAGE_URL);
            window.dispatchEvent(new Event('popstate'));
        } else {
            onClick();
        }
    }, [store]);

    return (
        <button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleClick}>
            {isHovered || isFavorite ? <HeartFilledIcon /> : <HeartOutlineIcon />}
        </button>
    );
};

const ImageCard = memo(
    ({
        cat_id,
        like_id,
        addLike,
        deleteLike,
    }: {
        cat_id: string;
        like_id?: string;
        isFavorite: boolean;
        addLike: (variables: { catId: string }) => void;
        deleteLike: (variables: { id: string }) => void;
    }) => {
        const handleClick = () => {
            if (!like_id) addLike({ catId: cat_id });
            else deleteLike({ id: like_id });
        };

        return (
            <div className={styles.ImageCardContainer}>
                <div className={styles.ImageContainer}>
                    <img src={`https://cdn2.thecatapi.com/images/${cat_id}.jpg`} />
                </div>
                <div className={styles.ImageCardActions}>
                    <HeartButton isFavorite={!!like_id} onClick={handleClick} />
                </div>
            </div>
        );
    },
);

ImageCard.displayName = 'ImageCard';

export const ImagesGrid = memo(({ ids }: { ids: string[] }) => {
    const favorites = useFavoritesStore();

    const queryClient = useQueryClient();
    const setAuth = useAuthActionsStore();

    const { mutate: addLike } = useMutation({
        mutationFn: async (variables: { catId: string }) => {
            const res = await addLikesRequest(variables.catId);

            if (!res.ok)
                setAuth({
                    isAuthenticated: false,
                    token: '',
                });
            return (await res.json()) as LikeEntity;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });

    const { mutate: deleteLike } = useMutation({
        mutationFn: async (variables: { id: string }) => {
            const res = await deleteLikeRequest(variables.id);
            if (!res.ok)
                setAuth({
                    isAuthenticated: false,
                    token: '',
                });

            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });

    return (
        <div className={styles.ImagesGridContainer}>
            {!ids.length && <p>Ничего не найдено</p>}
            {ids.map((id, ind) => (
                <ImageCard
                    cat_id={id}
                    like_id={favorites.find((f) => f.cat_id === id)?.id}
                    key={id + ind}
                    isFavorite={favorites.some((f) => f.cat_id === id)}
                    addLike={addLike}
                    deleteLike={deleteLike}
                />
            ))}
        </div>
    );
});

ImagesGrid.displayName = 'ImagesGrid';
