import Button from "../../Buttons/Button";
import classes from "./BlockImages.module.css";
import { useState, useContext, useEffect } from "react";
import { BASE_URL } from "../../../config";
import { ImageContext } from "../../../context/ImageContext";
import { AdminContext } from "../../../context/AdminContext";
import { updateImages } from "../../../endpoints/ImagesEndpoint"
import { UPDATE_IMAGE } from "../../../config";
import { useAuth } from "../../../context/AuthContext";

function BlockImages({ gameId, images }) {
  console.log("gameId recibido en BlockImages:", gameId);

  const [selectedFile, setSelectedFile] = useState(null);
  const [updatePromise, setUpdatePromise] = useState(null);
  const [updateCounter, setUpdateCounter] = useState(0);
  const { token } = useAuth();

  const { createImage, deleteImage, updateImage, fetchImages } =
    useContext(ImageContext);
  const { games } = useContext(AdminContext);

  useEffect(() => {
    fetchImages(gameId);
  }, [gameId, updateCounter]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Archivo seleccionado:", file);
    setSelectedFile(file);
  };

  const handleNewImage = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error("No se ha seleccionado un archivo.");
      setUpdatePromise("Por favor, selecciona un archivo.");
      return;
    }

    try {
      console.log("Iniciando creación de nueva imagen...");
      const game = games.find((game) => game.id === Number(gameId));
      const gameName = game ? game.title : "Juego desconocido";
      const newPosition = images.length + 1;
      const altText = `${gameName} - Imagen ${newPosition}`;

      const data = { image: selectedFile };

      await createImage(Number(gameId), altText, data);

      setUpdateCounter((prev) => prev + 1);
      setUpdatePromise("Nueva imagen agregada con éxito.");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error al agregar la nueva imagen:", error);
      setUpdatePromise("Hubo un error al agregar la nueva imagen.");
    }
  };

  const handleModifyImage = async (id) => {
    // e.preventDefault();
    // try {
    //   const imageId = images[iId].id;
    //   const altText = images[iId].altText;
    //   const data = { img1: selectedFile };
      
    // const formData = new FormData();
    // formData.append("file", selectedFile); 
    // formData.append("altText", altText);

    //   await updateImages(UPDATE_IMAGE, gameId, altText, imageId, data, token);
    //   setUpdateCounter((prev) => prev + 1);
    //   setUpdatePromise("Juego actualizado con éxito");
    // } catch (error) {
    //   console.error("Error al actualizar el juego:", error);
    //   setUpdatePromise("Hubo un error al actualizar el juego.");
    // }
    console.log(id);
  };


  const handleDeleteImage = async (imageId) => {
    console.log(`Eliminar imagen con ID: ${imageId}`);
    try {
      await deleteImage(imageId );
      setUpdateCounter((prev) => prev + 1);
      setUpdatePromise("Imagen eliminada con éxito.");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      setUpdatePromise("Hubo un error al eliminar la imagen.");
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
          <input type="file" onChange={handleFileChange} />
          <Button
            variant={"large"}
            color={"azul"}
            onClick={() => handleModifyImage(image.id)}
          >
            Modificar
          </Button>
          <Button
            variant={"large"}
            color={"red"}
            onClick={() => handleDeleteImage(image.id)}
          >
            Borrar Imagen
          </Button>
        </div>
      ))}
    </div>
  );
}

export default BlockImages;
