import classes from "./Error404Message.module.css";

function Error404Message() {
  return (
    <div className={classes.errorBody}>

      <div className={classes.errorText}>
        <h2>Página no encontrada</h2>
      </div>

      <img
        className={classes.gif}
        src="/gif/goku.gif"
        alt="gif de goku corriendo"
      />
    </div>
  );
}

export default Error404Message;
