import styles from './button.module.css';

export const Button = (props: React.ComponentProps<'button'>) => {
  return <button {...props} className={`${styles.Button} ${props.className}`} />;
};
