import Button from "../../Buttons/Button";
import classes from "./BlockImages.module.css";
import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../../config";

function BlockImages({ gameId, images }) {

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
      <h2>Imágenes adicionales: </h2>
      <Button
        variant={"large"}
        color={"morado"}
        onClick={handleSubmit}
      >
        Añadir imagen
      </Button>

      {updatePromise && <div className={classes.updateMsg}>{updatePromise}</div>}

      {
        images.slice(1).map((image) => (
          <div key={image.id} style={{ marginBottom: "20px" }} className={classes.imgBlock}>
            <img
              src={`${BASE_URL}${image.imageUrl}`}
              alt={image.alt}
              style={{ width: "150px", height: "150px", display: "block" }}
            />
            <input type="file" />
            <Button
              variant={"large"}
              color={"azul"}
              onClick={
                // () => console.log(`Modificar imagen con ID: ${image.id}`)
                handleSubmit
              }
            >
              Modificar
              {/*MANTENGO EL BOTON DE MODIFICAR PORQUE CREO QUE SI QUEREMOS METER UNA IMAGEN EN EL LUGAR x ES MAS FACIL ASI. SI VEIS QUE DA IGUAL BORRAD Y LISTO */}
            </Button>
            <Button
              variant={"large"}
              color={"red"}
              onClick={
                // () => console.log(`Borrar imagen con ID: ${image.id}`)
                handleSubmit
              }
            >
              Borrar Imagen
            </Button>
            {updatePromise && <div className={classes.updateMsg}>{updatePromise}</div>}
          </div>
        ))
      }
    </div >
  );
}

export default BlockImages;
