import { createContext, useEffect, useState} from "react";
import { useAuth } from "./AuthContext";
import { getImages, newImages, deleteImages, updateImages } from "../endpoints/ImagesEndpoint";
import { DELETE_IMAGE, GET_IMAGES_BY_GAME, NEW_IMAGE, UPDATE_IMAGE } from "../config";

// Crear el contexto
export const ImageContext = createContext();

// Proveedor del contexto
export const ImageProvider = ({ children }) => {
  const { token, decodedToken } = useAuth();
  const [ images, setImages ] = useState([]);

  // ----- Images -----

  const fetchImages = async (gameId) => {
    try {
      const response = await getImages(GET_IMAGES_BY_GAME, gameId, token);
      if (response && Array.isArray(response)) {
        setImages(response);
      } else {
        console.error("Error al obtener las imágenes");
      }
    } catch (error) {
      console.error("Error en fetchImages:", error);
    }
  };

  const createImage = async (gameId, data) => {
    try {
      await newImages(NEW_IMAGE, gameId, data, token); 
      fetchImages(gameId);
    } catch (error) {
      console.error("Error en newImages:", error);
    }
  };
  

  const updateImage = async (gameId, altText, imageId, data) => {
    try {
      await updateImages(UPDATE_IMAGE, gameId, altText, data, imageId, token);
      fetchImages(gameId);
    } catch (error) {
      console.error("Error en updateImages:", error);
    }
  };

  const deleteImage = async (imageId, gameId) => {
    try {
      await deleteImages(DELETE_IMAGE, imageId, token);
      fetchImages(gameId);
    } catch (error) {
      console.error("Error en deleteImages:", error);
    }
  };

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
