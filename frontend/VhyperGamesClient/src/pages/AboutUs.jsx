import Title from "../components/Titles/Title";
import SobreNosotrosDatos from "../components/AboutUs/SobreNosotrosDatos";
import Team from "../components/AboutUs/Team";
import Contacto from "../components/AboutUs/Contacto";
import Footer from "../components/Footer/Footer";

function SobreNosotros() {
  return (
    <>
      <div className="generalContainer">
        <Title text="SOBRE NOSOTROS" size="3em" color="#fff" align="center" />
        <SobreNosotrosDatos />
        <Team />
        <Contacto />
      </div>
      <Footer />
    </>
  );
}

export default SobreNosotros;
