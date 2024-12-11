import { useState, useEffect, useContext, useRef } from "react"; 
import Button from "../../Buttons/Button";
import BlockImages from "./BlockImages";
import { ImageContext } from "../../../context/ImageContext";
import classes from "./ImagesManager.module.css";
import { useAuth } from "../../../context/AuthContext";
import { BASE_URL, UPDATE_IMAGE } from "../../../config";
import { updateImages } from "../../../endpoints/ImagesEndpoint"

function ImagesManager({ gameId }) {
  const { token } = useAuth();
  const { images, fetchImages } = useContext(ImageContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [updatePromise, setUpdatePromise] = useState(null);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [msgColor, setMsgColor] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const timerRef = useRef(null);

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

  useEffect(() => {
    fetchImages(gameId);
  }, [gameId, updateCounter]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageId = images[0].id;
      const altText = images[0].altText;
      const data = { img1: selectedFile };

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("altText", altText);

      await updateImages(UPDATE_IMAGE, gameId, altText, imageId, data, token);
      setUpdateCounter((prev) => prev + 1);
      setUpdatePromise("Juego actualizado con éxito");
      setMsgColor("Success");
    } catch (error) {
      console.error("Error al actualizar el juego:", error);
      setUpdatePromise("Hubo un error al actualizar el juego.");
      setMsgColor("Error");
    }
  };

  return (
    <div className={classes.container}>
      {images.length > 0 ? (
        <>
          <img
            src={`${BASE_URL}${images[0].imageUrl}?timestamp=${Date.now()}`}
            alt={images[0].altText}
            className={classes.img}
          />
          <br />
          <input type="file" onChange={handleFileChange} />
          <Button variant={"large"} color={"azul"} onClick={handleSubmit}>
            Modificar Carátula
          </Button>
        </>
      ) : (
        <p>Cargando imagen...</p>
      )}
      {updatePromise && showMsg && (
        <div className={msgColor === "Success" ? classes.updateMsgSuccess : classes.updateMsgError}>
          {updatePromise}
        </div>
      )}

      <BlockImages gameId={gameId} images={images} />
    </div>
  );
}

export default ImagesManager;
