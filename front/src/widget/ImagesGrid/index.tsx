import { useState } from 'react';

import { HeartOutlineIcon } from '@/shared/icons/heartOutline';
import { HeartFilledIcon } from '@/shared/icons/heartFilled';

import styles from './images-grid.module.css';

const HeartButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {isHovered ? <HeartFilledIcon /> : <HeartOutlineIcon />}
        </button>
    );
};

export const ImagesGrid = ({ data }: { data: { id: string; url: string }[] }) => {
    return (
        <div className={styles.ImagesGridContainer}>
            {data.map((image) => (
                <div className={styles.ImageCardContainer} key={image.id}>
                    <div className={styles.ImageContainer}>
                        <img src={image.url} />
                    </div>
                    <div className={styles.ImageCardActions}>
                        <HeartButton />
                    </div>
                </div>
            ))}
        </div>
    );
};
