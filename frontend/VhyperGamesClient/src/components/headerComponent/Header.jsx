import classes from "./Header.module.css";
import Button from "../buttonComponent/Button";
import { messageCart, messageCatalog } from "../../helpers/messages";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../loginComponents/LoginModal";
import RegisterModal from "../registerComponents/RegisterModal";
import CartIcon from "./CartIcon";


function Header() {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegister, setMostrarRegister] = useState(false);

  const navigate = useNavigate();

  const handleImageClick = () => {
    setMostrarLogin(true);
  };
  const handleRegisterClick = () => {
    setMostrarLogin(false);
    setMostrarRegister(true);
  };

  return (
    <div className={classes.header}>
      <div className={classes.left}>
        <img
          className={classes.logoImg}
          src="/img/LogoVG.png"
          alt="Logo"
          onClick={() => navigate("/")}
        />
        <div className={classes.buttonHeader}>
          <Button
            variant={"short"}
            color={"morado-azul"}
            onClick={() => navigate("/catalogo")}
          >
            <img
              className={classes.catalogIcon}
              src="/icon/mando-icon.svg"
              alt="Mando"
            />
            Catálogo
          </Button>
        </div>
      </div>
      <div className={classes.searchBar}>
        <img
          className={classes.menu}
          src="/img/menu.PNG"
          alt="menu"
          onClick={messageCatalog}
        />
        <input
          className={classes.intoSearchBar}
          type="text"
          placeholder="Buscar juegos"
        />
        <img
          className={classes.search}
          src="/img/lupa.PNG"
          alt="search"
          onClick={messageCatalog}
        />
      </div>

      <div className={classes.icons}>
        <CartIcon onClick={() => navigate("/cart")} />

        <img
          className={classes.icon}
          src="../icon/user_header.svg"
          alt="user"
          onClick={handleImageClick} // Cambiado a la función sin paréntesis
        />
      </div>

      {/* Renderizar el LoginModal si mostrarLogin es true */}
      {mostrarLogin && (
        <LoginModal
          onClose={() => setMostrarLogin(false)}
          onRegisterClick={handleRegisterClick}
        />
      )}

      {/* Renderizar el RegisterModal si mostrarRegister es true */}
      {mostrarRegister && (
        <RegisterModal onClose={() => setMostrarRegister(false)} />
      )}
    </div>
  );
}

export default Header;
