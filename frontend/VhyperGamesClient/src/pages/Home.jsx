import Header from "../components/headerComponent/Header";
import Footer from "../components/footerComponent/Footer";
import BodyHome from "../components/homeComponents/BodyHome";

function Home() {
  return (
    <>
      <Header />
      <div className="generalContainer">
        <BodyHome />
      </div>
      <Footer />
    </>
  );
}

export default Home;
