import styles from "./Error404Message.module.css";

function Error404Message() {
  return (
    <div className={styles.errorBody}>

      <div className={styles.errorText}>
        <h2>Página no encontrada</h2>
      </div>

      <img
        className={styles.gif}
        src="/gif/goku.gif"
        alt="gif de kirby andando"
      />
      
    </div>
  );
}

export default Error404Message;
