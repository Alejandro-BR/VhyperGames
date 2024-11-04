import Header from "../components/headerComponent/Header";
import Footer from "../components/footerComponent/Footer";
import CatalogFilters from "../components/catalogComponent/CatalogFilters";
import Title from "../components/titleComponent/Title";

function Catalogo() {
  return (
    <>
      <Header/>
      <Title text="CATÁLOGO" size="3em" color="#fff" align="center"/>
      <CatalogFilters/>
      <Footer/>
    </>

  )
}

export default Catalogo;