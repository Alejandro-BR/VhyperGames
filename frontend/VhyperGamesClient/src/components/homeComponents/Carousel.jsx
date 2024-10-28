import classes from "./Carousel.module.css";
import CarouselPack from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// const CustomLeftArrow = ({ onClick }) => {
//   return (
//     <button onClick={onClick} className={classes.customArrow}>
//       &lt; {/* Flecha hacia la izquierda */}
//     </button>
//   );
// };

// const CustomRightArrow = ({ onClick }) => {
//   return (
//     <button onClick={onClick} className={classes.customArrow}>
//       &gt; {/* Flecha hacia la derecha */}
//     </button>
//   );
// };

function Carousel() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      partialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 20,
    },
  };

  return (
    <CarouselPack
      // partialVisible={true}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000} // 5 segundos
      showDots={true}
      arrows={false}
      // customLeftArrow={<CustomLeftArrow />}
      // customRightArrow={<CustomRightArrow />}
    >
      <div className={classes.bannerCard}>
        <img className={classes.bannerImg} src="/img/marca2.png" />
      </div>
      <div className={classes.bannerCard}>
        <img className={classes.bannerImg} src="/img/dragon-ball.png" />
      </div>
      <div className={classes.bannerCard}>
        <img className={classes.bannerImg} src="/img/gow.png" />
      </div>
      <div className={classes.bannerCard}>
        <img className={classes.bannerImg} src="/img/minecraft.png" />
      </div>
      <div className={classes.bannerCard}>
        <img className={classes.bannerImg} src="/img/witcher3.png" />
      </div>
    </CarouselPack>
  );
}

export default Carousel;
