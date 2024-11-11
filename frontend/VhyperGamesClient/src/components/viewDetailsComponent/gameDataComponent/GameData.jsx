import {DETAILS_VIEW_GAME_DATA} from "../../../config"
import Title from "../../titleComponent/Title";

function GameData({ id }) {

  id = 1;

  const [juegos, setJuegos] = useState([]);

  const fetchJuegos = async (id) => {
    try {
      const response = await fetch(`${DETAILS_VIEW_GAME_DATA}?id=${id}`);
    } catch (error) {
      
    }
  }

  return (
    <>
      <Title text={"Titulo Juego"} size="3em" color="#fff" align="right" />

    </>
  );
}

export default GameData;
