import { useState, useEffect, useContext } from "react";  // Solo importa una vez los hooks necesarios
import Button from "../../Buttons/Button";
import BlockImages from "./BlockImages";
import { ImageContext } from "../../../context/ImageContext";
import classes from "./ImagesManager.module.css";

function ImagesManager({ gameId }) {

  const { images, fetchImages} = useContext(ImageContext);

  useEffect(() => {
    console.log("Entra al useEffect de ImagesManager con id " + gameId)
    fetchImages(gameId); 
  }, [gameId]);
  

  const [updatePromise, setUpdatePromise] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await updateGameById(formData);
      setUpdatePromise("Juego actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el juego:", error);
      setUpdatePromise("Hubo un error al actualizar el juego.");
    }
  };

  return (
    <div>
      {/* Portada */}
      <input type="file" />
      <Button
        variant={"large"}
        color={"azul"}
        onClick={handleSubmit}
      >
        Modificar Carátula
      </Button>
      {updatePromise && <div className={classes.updateMsg}>{updatePromise}</div>}
      <BlockImages />
    </div>
  );
}

export default ImagesManager;
