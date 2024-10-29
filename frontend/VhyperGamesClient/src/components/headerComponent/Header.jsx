import classes from "./Header.module.css";
import Button from "../buttonComponent/Button";
import { messageCart, messageCatalog } from "../../helpers/messages";
import { useState } from "react";
import LoginModal from "../loginComponents/LoginModal";
import RegisterModal from "../registerComponents/RegisterModal";

function Header() {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegister, setMostrarRegister] = useState(false);

  const handleImageClick = () => {
    setMostrarLogin(true);
  };
  const handleRegisterClick = () => {
    setMostrarLogin(false);
    setMostrarRegister(true);
  };

  return (
    <div className={classes.header}>
      <img
        className={classes.logoImg}
        src="/img/LogoVG.png"
        alt="Logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
      <div className={classes.buttonHeader}>
        <Button
          variant={"short"}
          color={"morado-azul"}
          onClick={messageCatalog}
        >
          <img className={classes.catalogIcon} src="/icon/mando-icon.svg" alt="Mando" />

          <p className="buttonText">Catálogo</p>
        </Button>
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
          placeholder="Juegardos pa buscar uwu"
        />
        <img
          className={classes.search}
          src="/img/lupa.PNG"
          alt="search"
          onClick={messageCatalog}
        />
      </div>

      <div className={classes.icons}>
        <img
          className={classes.icon}
          src="/img/cart.PNG"
          alt="cart"
          onClick={messageCart}
        />
        <img
          className={classes.icon}
          src="/img/user.PNG"
          alt="user"
          onClick={handleImageClick} // Cambiado a la función sin paréntesis
        />
      </div>

      {/* Renderizar el LoginModal si mostrarLogin es true */}
      {mostrarLogin && (
        <LoginModal onClose={() => setMostrarLogin(false)} onRegisterClick={handleRegisterClick} />
      )}

      {/* Renderizar el RegisterModal si mostrarRegister es true */}
      {mostrarRegister && <RegisterModal onClose={() => setMostrarRegister(false)} />}
    </div>
  );
}

export default Header;
