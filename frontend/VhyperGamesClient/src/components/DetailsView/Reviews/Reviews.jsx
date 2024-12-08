import { useEffect, useState } from "react";
import { GET_REVIEW } from "../../../config";
import classes from "./Reviews.module.css";
import Rating from '../../GameCard/Rating';

function Reviews({ id, reviewUpdated }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(null)
  const [isReviews, setIsRievews] = useState(true)

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
        setTotalReviews(data.totalReviews)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id, reviewUpdated]);

  const getPlaneCount = (avgRating) => {
    if (avgRating < 0) return 1;
    if (avgRating === 0) return 2;
    if (avgRating > 0) return 3;
    return 0;
  };

  useEffect(() => {
    if (totalReviews > 0) {
      setIsRievews(true);
    } else {
      setIsRievews(false);
    }
  }, [totalReviews]);


  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={classes.container}>
      <div className={classes.titles}>
        <div className={classes.title}>
          <h1 className={classes.palito}>❙</h1>
          <h1>Reseñas : </h1>
        </div>
        <h1>{isReviews ?  totalReviews : "No hay reseñas" }</h1>
      </div>

      <div className={classes.reviewsContainer}>
        {reviews.map((review) => (

          <div key={review.id} className={classes.reviewContainer}>
            <div className={classes.leftReview}>
              <div className={classes.reviewUser}>{review.userName} :</div>
              <div className={classes.reviewText}>{review.reviewText}</div>
            </div>

            <div className={classes.rightReview}>
              <div className={classes.ratingPlains}>
                {[...Array(getPlaneCount(review.rating))].map((_, index) => (
                  <Rating key={review.id + index} avgRating={review.rating} />
                ))}
              </div>
              <div className={classes.reviewDate}>{new Date(review.reviewDate).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
