import Header from "../components/headerComponent/Header";
import Footer from "../components/footerComponent/Footer";
import Title from "../components/titleComponent/Title";
import BodyCatalog from "../components/catalogComponent/CatalogBody";

function Catalogo() {
  return (
    <>
      <Header/>
      <Title text="CATÁLOGO" size="3em" color="#fff" align="center"/>
      <BodyCatalog/>
      <Footer/>
    </>

  )
}

export default Catalogo;