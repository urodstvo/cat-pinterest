import { forwardRef } from 'react';

import styles from './input.module.css';

export const Input = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>((props, ref) => {
    return <input ref={ref} {...props} className={`${styles.Input} ${props.className}`} />;
});
