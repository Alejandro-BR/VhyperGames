import { useEffect, useState } from "react";
import { GET_REVIEW } from "../../../config";
import classes from "./Revews.module.css";
import Rating from '../../gameCardComponent/Rating';

function Reviews({ id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (id === 0) {
      setError("Error al cargar las reseñas");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${GET_REVIEW}?id=${id}`);
        if (!response.ok) {
          throw new Error("Ha habido un error al obtener las reseñas");
        }
        const data = await response.json();

        setReviews(data.reviews);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const getPlaneCount = (avgRating) => {
    if (avgRating < 0) return 1;
    if (avgRating === 0) return 2;
    if (avgRating > 0) return 3;
    return 0;
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>Reseñas :</h1>
      <div className={classes.reviewsContainer}>
        {reviews.map((review) => (

          <div key={review.id} className={classes.reviewContainer}>
            <div className={classes.leftReview}>
              <div className={classes.reviewUser}>{review.userName} :</div>
              <div className={classes.reviewText}>{review.reviewText}</div>
            </div>

            <div className={classes.rightReview}>
              <div>
                {[...Array(getPlaneCount(review.rating))].map((_, index) => (
                  <Rating key={review.id + index} avgRating={review.rating} />
                ))}
              </div>
              <div className={classes.reviewDate}>{new Date(review.reviewDate).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Reviews;
