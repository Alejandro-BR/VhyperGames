import { useState, useRef } from "react";
import classes from "./Header.module.css";
import Button from "../buttonComponent/Button";
import { messageCart, messageCatalog } from "../../helpers/messages";
import { useNavigate } from "react-router-dom";
import LoginModal from "../loginComponents/LoginModal";
import RegisterModal from "../registerComponents/RegisterModal";
import CartIcon from "./CartIcon";
import { useAuth } from "../../context/authcontext";
import { deleteLocalStorage } from "../../utils/keep";

function Header() {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegister, setMostrarRegister] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { token, username, logout } = useAuth();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // Manejar clic en el ícono de usuario
  const handleUserClick = () => {
    if (!token) {
      setMostrarLogin(true);
    } else {
      alert("Aún no tenemos página de usuario.");
    }
  };

  // Mostrar el ícono de logout al hacer hover
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowLogout(true);
  };


  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowLogout(false);
    }, 500); 
  };

  // Manejar clic en logout
  const handleLogout = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    logout();
    setShowLogout(false);
    deleteLocalStorage("cart");
    // window.location.reload();
    navigate("/");
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

        <div
          className={classes.userIconWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >

          <div className={classes.userContainer}>
            <img
              className={classes.user}
              src="../icon/user_header.svg"
              alt="user"
              onClick={handleUserClick}
            />
            {token && (
              <span className={classes.userLabel}>
                Hola, {username}
              </span>
            )}
          </div>


          {token && showLogout && (
            <div className={classes.logoutContainer}>
              <img
                className={classes.logoutIcon}
                src="../icon/logout.svg"
                alt="logout"
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      </div>

      {/* Renderizar el LoginModal si mostrarLogin es true */}
      {mostrarLogin && (
        <LoginModal
          onClose={() => setMostrarLogin(false)}
          onRegisterClick={() => setMostrarRegister(true)}
        />
      )}

      {mostrarRegister && (
        <RegisterModal onClose={() => setMostrarRegister(false)} />
      )}
    </div>
  );
}

export default Header;
