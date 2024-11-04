import PropTypes from 'prop-types';
import classes from "./BlockGame.module.css";
import GameCart from '../gameCartComponent/GameCart';

function BlockGame({ games }) {
  return (
    <div className={classes.container}>
      {games.map((game, index) => (
        <div  key={index}>
          <GameCart title={game.title} stock={game.stock} price={game.price} imgUrl={game.imageUrl} />
        </div>
      ))}
    </div>
  );
}

BlockGame.propTypes = {
  games: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BlockGame;
