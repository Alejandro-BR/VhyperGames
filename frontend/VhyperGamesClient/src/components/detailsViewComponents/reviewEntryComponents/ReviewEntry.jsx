import React, { useEffect, useState } from 'react';
import { NEW_REVIEW, GET_REVIEW_BY_USER } from '../../../config.js';
import { getVarSessionStorage } from "../../../utils/keep.js";
import { jwtDecode } from 'jwt-decode';
import Button from '../../buttonComponent/Button.jsx';
import classes from './ReviewEntry.module.css';

const ReviewEntry = ({ gameId, isAuthenticated }) => {
  const [reviewText, setReviewText] = useState('');
  const [existingReview, setExistingReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = getVarSessionStorage('accessToken');
  
  // Función para cargar la reseña existente si la hay
  const fetchUserReview = async () => {
    try {
      const response = await fetch(`${GET_REVIEW_BY_USER}?gameId=${gameId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });

      if (response.ok) {
        const data = await response.json();
    
        // Si no hay reseña, simplemente salir
        if (!data || !data.hasReview) {
            console.log("No hay reseña para este juego.");
            return;
        }
  
        // Si hay una reseña, cargarla en el estado
        setReviewText(data.review.reviewText);
        setExistingReview(data.review);
       }

    } catch (error) {
        console.error("Error al obtener la reseña:", error);
    }
};


  useEffect(() => {
    if (isAuthenticated) {
      fetchUserReview();
    }
  }, [gameId, isAuthenticated]);

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = async () => {
    if (reviewText.trim() === '') return;

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    // Crear una nueva reseña
    try {
      setIsLoading(true);
      const response = await fetch(NEW_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId, userId, reviewText })
      });

      if (response.ok) {

        setReviewText('');
        window.location.reload();

      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }

    } catch (error) {
      console.error('Error al enviar la reseña:', error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.reviewbox}>
      {isAuthenticated ? (
        <>
          <textarea
            className={classes.textbox}
            placeholder="Escribe tu reseña aquí..."
            value={reviewText}
            onChange={handleInputChange}
            maxLength="200"
            readOnly={!!existingReview}
          />

          {/* Mostrar el botón adecuado */}
          {existingReview ? (
            <p className={classes.existingReviewText}>Reseña enviada el {new Date(existingReview.reviewDate).toLocaleDateString()}</p>
          ) : (
            <Button
              variant={"large"}
              color={"azul"}
              onClick={handleSubmit}
              disabled={isLoading}
              className={classes.button}
            >
              {isLoading ? "Cargando..." : "Nueva Reseña"}
            </Button>
          )}
        </>
      ) : (
        <p>Debes estar registrado para dejar una reseña.</p>
      )}
    </div>
  );
};

export default ReviewEntry;
