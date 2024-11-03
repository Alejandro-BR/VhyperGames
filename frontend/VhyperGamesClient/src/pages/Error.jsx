import Footer from "../components/footerComponent/Footer";
import Header from "../components/headerComponent/Header";
import Error404Message from "../components/errorComponent/Error404Message";

function Error() {
  return (
    <>
      <Header></Header>
      <Error404Message/>
      <Footer></Footer>
    </>
  );
}

export default Error;

// Esta clase hay que hacer un error 404 bien hecho