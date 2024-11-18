import { useState, useEffect } from "react";
import { DETAILS_VIEW_GAME_DATA } from "../../../config";
import Title from "../../titleComponent/Title";
import DetailsCarousel from "../detailsCarousel/DetailsCarousel";

import classes from "./GameData.module.css";

function GameData({ id }) {
  const [juego, setJuego] = useState(null);

  const fetchJuego = async (id) => {
    try {
      const response = await fetch(`${DETAILS_VIEW_GAME_DATA}?id=${id}`);
      if (!response.ok) throw new Error("Error en la respuesta de la API");
      const data = await response.json();
      console.log(data);
      setJuego(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchJuego(id);
  }, [id]);

  return (
    <div className={classes.gamedata}>
      {juego && (
        <Title
          text={juego ? juego.title : "Cargando..."}
          size="3em"
          color="#fff"
          align="left"
          variant="tituloJuego"
        />
      )}
      {juego && (
        <DetailsCarousel imgGames={juego.imageGames} />
      )}
      {/* <DetailsCarousel imgGames={juego.imageGames} /> */}
      {juego && (
        <p className={classes.gamedata__description}>{juego.description}</p>
      )}
      {juego && <p className={classes.gamedata__sinopsis}>{juego.sinopsis}</p>}
    </div>
  );
}

export default GameData;
