import { useEffect, useState } from 'react';
import { NEW_REVIEW, GET_REVIEW_BY_USER } from '../../../config.js';
import Button from '../../Buttons/Button.jsx';
import classes from './ReviewEntry.module.css';
import { useAuth } from '../../../context/AuthContext.jsx'

const ReviewEntry = ({ gameId, onReviewAdded }) => {
  const { token, decodedToken } = useAuth();
  const [reviewText, setReviewText] = useState('');
  const [existingReview, setExistingReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ownsGame, setOwnsGame] = useState(false);

  const isAuthenticated = !!token;

  // Función para cargar la reseña existente, si la hay
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

        setOwnsGame(data.ownsGame);
        if (!data || !data.hasReview) {
          return;
        }

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
  }, [gameId, isAuthenticated, token, reviewText]);

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = async () => {
    if (reviewText.trim() === '') return;

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
        if (onReviewAdded) {
          onReviewAdded();
        }

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
          {ownsGame ? (
            <>
              {existingReview ? (
                <p className={classes['review-box__existing-text']}>
                  Reseña enviada el {new Date(existingReview.reviewDate).toLocaleDateString()}
                </p>
              ) : (
                <Button
                  variant={"large"}
                  color={"azul"}
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={classes['review-box__button']}
                >
                  {isLoading ? "Cargando..." : "Nueva Reseña"}
                </Button>
              )}
  
              <textarea
                className={classes['review-box__textarea']}
                placeholder="Escribe tu reseña aquí..."
                value={reviewText}
                onChange={handleInputChange}
                maxLength="200"
                readOnly={!!existingReview}
              />
            </>
          ) : (
            <p className={classes['review-box__error-text']}>
              No puedes dejar una reseña porque no posees este juego.
            </p>
          )}
        </>
      ) : (
        <p>Debes estar registrado para dejar una reseña.</p>
      )}
    </div>
  );
};

export default ReviewEntry;
