import { memo } from 'react';
import { CardImageContainer, ImageCard } from './imageCard';

import styles from './images-grid.module.css';

export const ImagesGrid = memo(({ data }: { data: string[] }) => {
  return (
    <div className={styles.ImagesGridContainer}>
      {data.map((id) => (
        <ImageCard key={id} cat_id={id}>
          <CardImageContainer cat_id={id} />
        </ImageCard>
      ))}
    </div>
  );
});

ImagesGrid.displayName = 'ImagesGrid';
