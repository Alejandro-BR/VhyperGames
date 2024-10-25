
import styles from './Button.module.css';

function ButtonLarge({ children, onClick, variant}) {
  return (
    <button
      className={`${styles.buttonLarge} ${styles[variant]}` }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonLarge;
