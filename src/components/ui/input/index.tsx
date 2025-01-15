import styles from './input.module.css';

export const Input = (props: React.ComponentProps<'input'>) => {
  return <input {...props} className={`${styles.Input} ${props.className}`} />;
};
