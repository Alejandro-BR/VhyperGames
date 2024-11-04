import styles from "./Error404Message.module.css";

function Error404Message() {
  return (
    <div className={styles.errorBody}>
      <h1 className={styles.errorTitle}>ERROR 404!</h1>

      <img
        className={styles.gif}
        src="/gif/goku.gif"
        alt="gif de kirby andando"
      />

      <div className={styles.errorText}>
        <h2>Página no encontrada</h2>
      </div>
    </div>
  );
}

export default Error404Message;
