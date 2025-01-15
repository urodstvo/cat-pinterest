import { memo, useState } from 'react';

import { HeartOutlineIcon, HeartFilledIcon } from '@/components/icons';

import { useFavoritesStore } from '@/pages/provider';

import styles from './images-grid.module.css';

export const ImageCard = memo(({ children, cat_id }: { children: React.ReactNode; cat_id: string }) => {
  return (
    <div className={styles.ImageCardContainer}>
      {children}
      <CardFooter cat_id={cat_id} />
    </div>
  );
});

export const CardImageContainer = ({ cat_id }: { cat_id: string }) => {
  return (
    <div className={styles.ImageContainer}>
      <img src={`https://cdn2.thecatapi.com/images/${cat_id}.jpg`} />
    </div>
  );
};

const CardFooter = ({ cat_id }: { cat_id: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { favorites, add, remove } = useFavoritesStore();

  return (
    <div className={styles.ImageCardActions}>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => (favorites.includes(cat_id) ? remove(cat_id) : add(cat_id))}
      >
        {favorites.includes(cat_id) || isHovered ? <HeartFilledIcon /> : <HeartOutlineIcon />}
      </button>
    </div>
  );
};
