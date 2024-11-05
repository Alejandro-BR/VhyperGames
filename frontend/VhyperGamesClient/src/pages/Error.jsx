// import Footer from "../components/footerComponent/Footer";
import Header from "../components/headerComponent/Header";
import Error404Message from "../components/errorComponent/Error404Message";
import Title from "../components/titleComponent/Title";


function Error() {
  return (
    <>
      <Header />
      <div className="generalContainer">
        <Title text="ERROR 404!" size="3em" color="#fff" align="center" />
        <Error404Message />
      </div>
      {/* <Footer></Footer> */}
    </>
  );
}

export default Error;

// Esta clase hay que hacer un error 404 bien hecho