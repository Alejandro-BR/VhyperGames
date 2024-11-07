import Footer from "../components/footerComponent/Footer";
import Title from "../components/titleComponent/Title";
import CatalogBody from "../components/catalogComponent/CatalogBody";

function Catalogo() {
  return (

    <div>
      <div className="generalContainer">
        <Title text="CATÁLOGO" size="3em" color="#fff" align="center" />
        <CatalogBody />
      </div>
      <Footer />
    </div>

  )
}

export default Catalogo;