import React, { useState } from 'react';
import { NEW_REVIEW } from '../../../config.js';
import { getVarSessionStorage } from "../../../utils/keep.js";
import { jwtDecode } from 'jwt-decode';

const ReviewEntry = ({ gameId, isAuthenticated }) => {
  const [reviewText, setReviewText] = useState('');

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = async () => {
    if (reviewText.trim() === '') return;

    const token = getVarSessionStorage('accessToken');
    if (!token) {
      alert('No estás autenticado.');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    console.log(userId, gameId);

    if (!userId || !gameId) {
      alert('Faltan datos necesarios.');
      return;
    }

    try {
      const response = await fetch(NEW_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId, userId, reviewText })
      });

      if (response.ok) {
        alert('Reseña enviada con éxito');
        setReviewText('');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
      alert('Hubo un problema al enviar tu reseña.');
    }
  };

  return (
    <div className="review-box">
      {isAuthenticated ? (
        <>
          <textarea
            placeholder="Escribe tu reseña aquí..."
            value={reviewText}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>Enviar Reseña</button>
        </>
      ) : (
        <p>Debes estar registrado para dejar una reseña.</p>
      )}
    </div>
  );
};

export default ReviewEntry;
