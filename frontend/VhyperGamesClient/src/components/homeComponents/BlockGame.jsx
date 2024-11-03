import PropTypes from 'prop-types';
import classes from "./BlockGame.module.css";

function BlockGame({ games }) {
  return (
    <div className={classes.container}>
      {games.map((game, index) => (
        <div key={index}>{game}</div>
      ))}
    </div>
  );
}

BlockGame.propTypes = {
  games: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BlockGame;
