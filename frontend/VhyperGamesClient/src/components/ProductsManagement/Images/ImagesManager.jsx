import Button from "../../Buttons/Button"
import BlockImages from "./BlockImages";
import { ImageContext } from "../../../context/ImageContext";
import { useContext, useEffect } from "react";

function ImagesManager({ gameId }) {

  const { images, fetchImages, updateImage} = useContext(ImageContext);

  useEffect(() => {
    fetchImages(gameId);
    console.log(images);
  }, [gameId])

  return (<div >
    <div>
      {/* Portada */}
      {/* <img
        src={images[0]?.imageUrl || ""} 
        alt="Imagen de portada por defecto"
      /> */}
      <input type="file" />
      <Button
        variant={"large"}
        color={"azul"}
        onClick={console.log("Hola")}
      >
        Modificar Carátula
      </Button>
    </div>
    <BlockImages/>
  </div>);
}

export default ImagesManager;