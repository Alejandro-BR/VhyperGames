import Header from "../components/headerComponent/Header";
import Footer from "../components/footerComponent/Footer";
import CatalogFilters from "../components/catalogComponent/CatalogFilters";

function Catalogo() {
  return (
    <>
      <Header/>
      <h1>CATÁLOGO</h1>
      <CatalogFilters/>
      <Footer/>
    </>

  )
}

export default Catalogo;