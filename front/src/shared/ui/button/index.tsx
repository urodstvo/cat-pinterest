import { forwardRef } from 'react';

import styles from './button.module.css';

export const Button = forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>((props, ref) => {
    return <button {...props} ref={ref} className={`${styles.Button} ${props.className}`} />;
});
