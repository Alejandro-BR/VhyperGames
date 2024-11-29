import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./Timer.module.css";

function Timer({ route, time }) {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(time / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, []); 

  useEffect(() => {
    if (remainingTime === 0) {
      navigate(route); 
    }
  }, [remainingTime, navigate, route]); 

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className={classes["timer"]}>
      <p className={classes["timer__text"]}>
        Tiempo restante antes de que expire tu sesión de pago: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
      <hr className={classes["timer__separator"]} />
    </div>
  );
}

export default Timer;
