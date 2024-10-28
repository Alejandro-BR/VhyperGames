import Header from "../components/headerComponent/Header";
import Carousel from "../components/homeComponents/Carousel";
import OfertasNuevos from "../components/homeComponents/OfertasNuevo";
import Footer from "../components/footerComponent/Footer";

function Home() {
  return (
    <div>
      <Header />
      <Carousel />
      <OfertasNuevos />
      <Footer />
    </div>
  );
}

export default Home;
