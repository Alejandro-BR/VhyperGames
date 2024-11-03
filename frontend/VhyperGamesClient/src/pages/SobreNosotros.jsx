import styles from "../components/sobreNosotrosComponent/SobreNosotros.module.css";
import Header from "../components/headerComponent/Header";
import SobreNosotrosDatos from "../components/sobreNosotrosComponent/SobreNosotrosDatos";
import Team from "../components/sobreNosotrosComponent/Team";
import Contacto from "../components/sobreNosotrosComponent/Contacto";
import Footer from "../components/footerComponent/Footer";

function SobreNosotros() {
  return (
    <>
      <Header />
      <SobreNosotrosDatos />
      <Team />
      <Contacto />
      <Footer />
    </>
  );
}

export default SobreNosotros;
