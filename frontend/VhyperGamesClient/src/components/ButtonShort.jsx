import styles from './Button.module.css';
// , bgColor1, bgColor2

function ButtonShort({children, onClick}) {
  return (
    <button className={styles.buttonShort}
      onClick={onClick}
    >{children}</button>
  );
}

export default ButtonShort;