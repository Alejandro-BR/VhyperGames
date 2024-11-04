import classes from "./BlockGame.module.css";
import GameCart from '../gameCartComponent/GameCart';

function BlockGame({ games, variant }) {
  return (
    <div className={`${classes.container} ${[classes.variant]}`} >
      {games.map((game) => (
        <div key={game.id}>
          <GameCart title={game.title} stock={game.stock} price={game.price} imgUrl={game.imageUrl} />
        </div>
      ))}
    </div>
  );
}

export default BlockGame;
