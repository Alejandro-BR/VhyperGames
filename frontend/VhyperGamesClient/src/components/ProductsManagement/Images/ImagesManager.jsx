import Button from "../../Buttons/Button"
import BlockImages from "./BlockImages";
import { useState, useEffect, useContext } from "react";
import classes from "./ImagesManager.module.css"

function ImagesManager({ gameId }) {

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


  return (<div >
    <div>
      {/* Portada */}
      <img src="/img/cyberpunk.png" alt="Imagen portada"></img>
      <input type="file" />
      <Button
        variant={"large"}
        color={"azul"}
        onClick={handleSubmit}
      >
        Modificar Carátula
      </Button>
      {updatePromise && <div className={classes.updateMsg}>{updatePromise}</div>}
    </div>
    <BlockImages/>
  </div>);
}

export default ImagesManager;