import classes from "./CartListGames.module.css";

const CartListGames = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.container__left}>
          <img src='./img/cyberpunk.png'/>
        </div>
        <div className={classes.container__right}>
          <div className={classes.container__right_top}>
            <p>Cyberpunk 2077</p>
            <p>9,99</p>
            <p>Cantidad: 1</p>
          </div>
          <div className={classes.container__right_bottom}>
            +/-
          </div>
        </div>
        <hr className={classes.cartPayment__line}/>
      </div>
  </>
  );
};

export default CartListGames;
