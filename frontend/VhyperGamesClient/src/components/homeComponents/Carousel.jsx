import classes from "./Carousel.module.css";
import CarouselPack from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Carousel() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      partialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
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
      className={classes.carrousel}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      showDots={true}
      arrows={false}
    >
      <img className={classes.bannerImg} src="/img/marca2.png" alt="Marca 2" />
      <img
        className={classes.bannerImg}
        src="/img/dragon-ball.png"
        alt="Dragon Ball"
      />
      <img className={classes.bannerImg} src="/img/gow.png" alt="GOW" />
      <img
        className={classes.bannerImg}
        src="/img/minecraft.png"
        alt="Minecraft"
      />
      <img
        className={classes.bannerImg}
        src="/img/witcher3.png"
        alt="Witcher 3"
      />
    </CarouselPack>
  );
}

export default Carousel;
