import { memo } from 'react';

import styles from './images-grid.module.css';
import { CardFooter, CardImageContainer, ImageCard } from './imageCard';

export const ImagesGrid = memo(({ ids }: { ids: string[] }) => {
    return (
        <div className={styles.ImagesGridContainer}>
            {ids.map((id) => (
                <ImageCard key={id} cat_id={id}>
                    <CardImageContainer cat_id={id} />
                    <CardFooter />
                </ImageCard>
            ))}
        </div>
    );
});

ImagesGrid.displayName = 'ImagesGrid';
