import Button from "../../Buttons/Button";
import classes from "./BlockImages.module.css";
import { useState, useContext, useEffect, useRef } from "react";
import { BASE_URL } from "../../../config";
import { ImageContext } from "../../../context/ImageContext";
import { AdminContext } from "../../../context/AdminContext";

function BlockImages({ gameId, images }) {

  const [selectedFiles, setSelectedFiles] = useState([]);
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
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };
  

  const handleNewImage = async (e) => {
    e.preventDefault();
  
    if (selectedFiles.length === 0) {
      console.error("No se han seleccionado archivos.");
      setUpdatePromise("Por favor, selecciona al menos un archivo.");
      return;
    }
  
    try {
      const data = { images: selectedFiles };
  
      await createImage(Number(gameId), data); // Pasa todas las imágenes de una sola vez
  
      setUpdateCounter((prev) => prev + 1);
      setUpdatePromise("Nuevas imágenes agregadas con éxito.");
      setMsgColor("Success");
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error al agregar las nuevas imágenes:", error);
      setUpdatePromise("Hubo un error al agregar las nuevas imágenes.");
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
      <input type="file" onChange={handleFileChange} multiple />

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
