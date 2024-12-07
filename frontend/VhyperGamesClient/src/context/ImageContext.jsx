import { createContext, useEffect, useState} from "react";
import { useAuth } from "./AuthContext";
import { getImages, newImages, deleteImages, updateImages } from "../endpoints/ImagesEndpoint";
import { DELETE_IMAGE, GET_IMAGES_BY_GAME, NEW_IMAGE, UPDATE_IMAGE } from "../config";

// Crear el contexto
export const ImageContext = createContext();

// Proveedor del contexto
export const ImageProvider = ({ children }) => {
  const { token, decodedToken } = useAuth();
  const { images, setImages } = useState([]);

  // ----- Images -----

  const fetchImages = async (gameId) => {
    try {
      const response = await getImages(GET_IMAGES_BY_GAME, gameId, token);
      console.log(response);
      if (response && Array.isArray(response)) {
        console.log("setImages entra ?")
        setImages(response);
        console.log("Estado después de setImages:", response);
      } else {
        console.error("Error al obtener las imágenes");
      }
    } catch (error) {
      console.error("Error en fetchImages:", error);
    }
  };

  const createImage = async (gameId, altText, data) => {
    try {
      const response = await newImages(NEW_IMAGE, gameId, altText, data, token);
      if (response) {
        fetchImages();
      } else {
        console.error("Error al crear una imagen");
      }
    } catch (error) {
      console.error("Error en newImages:", error);
    }
  };

  const updateImage = async (gameId, altText, imageId, data) => {
    try {
      const response = await updateImages(UPDATE_IMAGE, gameId, altText, data, imageId, token);
      if (response) {
        fetchImages();
      } else {
        console.error("Error al actualizar una imagen");
      }
    } catch (error) {
      console.error("Error en updateImages:", error);
    }
  };

  const deleteImage = async (imageId) => {
    try {
      const response = await deleteImages(DELETE_IMAGE, imageId);
      if (response) {
        fetchImages();
      } else {
        console.error("Error al borrar una imagen");
      }
    } catch (error) {
      console.error("Error en deleteImages:", error);
    }
  };

  // ----- useEffect -----

  useEffect(() => {
    if (token && decodedToken?.Role === "Admin") {
      // fetchImages();
    }
  }, [token, decodedToken]);

  const contextValue = {
    fetchImages,
    createImage,
    updateImage,
    deleteImage,
    images
  };

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};
