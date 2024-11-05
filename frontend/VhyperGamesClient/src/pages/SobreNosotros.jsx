import Header from "../components/headerComponent/Header";
import Title from "../components/titleComponent/Title";
import SobreNosotrosDatos from "../components/sobreNosotrosComponent/SobreNosotrosDatos";
import Team from "../components/sobreNosotrosComponent/Team";
import Contacto from "../components/sobreNosotrosComponent/Contacto";
import Footer from "../components/footerComponent/Footer";

function SobreNosotros() {
  return (
    <>
      <Header />
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
