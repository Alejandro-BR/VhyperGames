import { useState, useEffect } from "react";
import { DETAILS_VIEW_GAME_DATA } from "../../../config";
import Title from "../../titleComponent/Title";

function GameData({ id }) {
  // Id estático para propósitos de este ejemplo
  id = 2;

  // Estado inicial para almacenar el objeto de juego
  const [juego, setJuego] = useState(null);

  // Función para obtener los datos del juego
  const fetchJuego = async (id) => {
    try {
      const response = await fetch(`${DETAILS_VIEW_GAME_DATA}?id=${id}`);
      if (!response.ok) throw new Error("Error en la respuesta de la API");
      const data = await response.json();
      setJuego(data);  // Almacenar el objeto recibido en el estado
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  // Llamar a fetchJuego cuando el componente se monte
  useEffect(() => {
    fetchJuego(id);
  }, [id]);

  return (
    <>

      <Title text={juego ? juego.title : "Cargando..."} size="3em" color="#fff" align="left" variant="tituloJuego" />
      {juego && (
        <p style={{ color: "#fff", textAlign: "left" }}>{juego.description}</p>
      )}
    </>
  );
}

export default GameData;
