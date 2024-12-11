import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import ScrollToTop from "../components/ScrollToTop";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="generalContainer">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;