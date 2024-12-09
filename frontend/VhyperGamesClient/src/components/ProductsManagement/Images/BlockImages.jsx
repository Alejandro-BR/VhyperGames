import Button from "../../Buttons/Button";
import classes from "./BlockImages.module.css";
import { useState, useContext } from "react";
import { BASE_URL } from "../../../config";
import { ImageContext } from "../../../context/ImageContext";
import { AdminContext } from "../../../context/AdminContext";

function BlockImages({ gameId, images }) {
  console.log("gameId recibido en BlockImages:", gameId);

  const [selectedFiles, setSelectedFiles] = useState(null);
  const { createImage } = useContext(ImageContext);
  const { games } = useContext(AdminContext);

  const [updatePromise, setUpdatePromise] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Tomar el primer archivo seleccionado
    console.log("Archivo seleccionado:", file); // Log para verificar el archivo
    setSelectedFiles(file); // Asignar el archivo directamente
  };

  const handleNewImage = async (e) => {
    e.preventDefault();

    if (!selectedFiles) {
      console.error("No se ha seleccionado un archivo.");
      setUpdatePromise("Por favor, selecciona un archivo.");
      return;
    }

    try {
      console.log("Iniciando creación de nueva imagen...");
      console.log("Archivo seleccionado:", selectedFiles);


      const game = games.find((game) => game.id === Number(gameId));
      console.log("Juego encontrado:", game);

      const gameName = game ? game.title : "Juego desconocido";
      const newPosition = images.length + 1;
      const altText = `${gameName} - Imagen ${newPosition}`;

      const data = { image: selectedFiles };

      await createImage(Number(gameId), altText, data);
  

      setUpdatePromise("Nueva imagen agregada con éxito.");
      setSelectedFiles(null); // Reiniciar el archivo seleccionado
    } catch (error) {
      console.error("Error al agregar la nueva imagen:", error);
      setUpdatePromise("Hubo un error al agregar la nueva imagen.");
    }
  };

  return (
    <div>
      <h2>Imágenes adicionales:</h2>

      <input type="file" onChange={handleFileChange} />

      <Button
        variant={"large"}
        color={"morado"}
        onClick={handleNewImage}
      >
        Añadir imagen
      </Button>

      {updatePromise && <div className={classes.updateMsg}>{updatePromise}</div>}

      {images.slice(1).map((image) => (
        <div
          key={image.id}
          style={{ marginBottom: "20px" }}
          className={classes.imgBlock}
        >
          <img
            src={`${BASE_URL}${image.imageUrl}`}
            alt={image.alt}
            style={{ width: "150px", height: "150px", display: "block" }}
          />
          <input type="file" />
          <Button
            variant={"large"}
            color={"azul"}
            onClick={handleNewImage}
          >
            Modificar
          </Button>
          <Button
            variant={"large"}
            color={"red"}
            onClick={handleNewImage}
          >
            Borrar Imagen
          </Button>
          {updatePromise && <div className={classes.updateMsg}>{updatePromise}</div>}
        </div>
      ))}
    </div>
  );
}

export default BlockImages;
