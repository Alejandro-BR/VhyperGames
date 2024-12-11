import Button from "../../Buttons/Button";
import classes from "./BlockImages.module.css";
import { useState, useContext, useEffect, useRef } from "react";
import { BASE_URL } from "../../../config";
import { ImageContext } from "../../../context/ImageContext";
import { AdminContext } from "../../../context/AdminContext";

function BlockImages({ gameId, images }) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [updatePromise, setUpdatePromise] = useState(null);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [msgColor, setMsgColor] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const timerRef = useRef(null);

  const { createImage, deleteImage, fetchImages } =
    useContext(ImageContext);
  const { games } = useContext(AdminContext);

  useEffect(() => {
    fetchImages(gameId);
  }, [gameId, updateCounter]);
  
  useEffect(() => {
    if (updatePromise) {
      setShowMsg(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setShowMsg(false);
      }, 2500);
    }
  }, [updatePromise]);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
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
      const game = games.find((game) => game.id === Number(gameId));
      const gameName = game ? game.title : "Juego desconocido";
      const newPosition = images.length + 1;
      const altText = `${gameName} - Imagen ${newPosition}`;

      const data = { image: selectedFile };

      await createImage(Number(gameId), altText, data);

      setUpdateCounter((prev) => prev + 1);
      setUpdatePromise("Nueva imagen agregada con éxito.");
      setMsgColor("Success");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error al agregar la nueva imagen:", error);
      setUpdatePromise("Hubo un error al agregar la nueva imagen.");
      setMsgColor("Error");
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteImage(imageId, Number(gameId));
      setUpdateCounter((prev) => prev + 1);
      setUpdatePromise("Imagen eliminada con éxito.");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      setUpdatePromise("Hubo un error al eliminar la imagen.");
    }
  };

  return (
    <div className={classes.additionalImgs}>

      <p>Imágenes adicionales:</p>
      <input type="file" onChange={handleFileChange} />

      <Button
        variant={"large"}
        color={"morado"}
        onClick={handleNewImage}
      >
        Añadir imagen
      </Button>

      {updatePromise && showMsg && (
        <div className={msgColor === "Success" ? classes.updateMsgSuccess : classes.updateMsgError}>
          {updatePromise}
        </div>
      )}

      <div className={classes.imgList}>
        {images.slice(1).map((image) => (
          <div
            key={image.id}
            className={classes.imgContainer}
          >
            <img
              src={`${BASE_URL}${image.imageUrl}`}
              alt={image.alt}
              className={classes.img}
            />
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

    </div>
  );
}

export default BlockImages;
