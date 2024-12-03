import { useState, useRef } from "react";
import classes from "./Header.module.css";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
import LoginModal from "../Login/LoginModal";
import RegisterModal from "../Register/RegisterModal";
import CartIcon from "./CartIcon";
import { useAuth } from "../../context/AuthContext";
import { deleteLocalStorage } from "../../utils/keep";

function Header() {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegister, setMostrarRegister] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [drmFilter, setDrmFilter] = useState(-1);

  const { token, username, logout, admin } = useAuth();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  console.log(admin)
  // Manejar clic en el ícono de usuario
  const handleUserClick = () => {
    if (!token) {
      setMostrarLogin(true);
    } else {
      navigate("/user");
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDRMOption = (drmValue) => {
    setDrmFilter((prevFilter) => (prevFilter === drmValue ? -1 : drmValue));
    setMenuOpen(false);
  };

  const handleSearch = () => {
    navigate(`/catalogo?SearchText=${encodeURIComponent(searchText)}&DrmFree=${drmFilter}`);
  };


  // Manejar clic en logout
  const handleLogout = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    logout();
    setShowLogout(false);
    deleteLocalStorage("cart");
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
        <div className={classes["menu-container"]}>
          <img
            className="menu-icon"
            src="/icon/rayas-icon.svg"
            alt="menu"
            onClick={toggleMenu}
          />

          {menuOpen && (
            <div className={classes["dropdown-menu"]}>
              <div
                className={`${classes["dropdown-menu__option"]} ${drmFilter === 1 ? classes["dropdown-menu__option--selected"] : ""
                  }`}
                onClick={() => handleDRMOption(1)}
              >
                DRM-FREE
              </div>
              <div
                className={`${classes["dropdown-menu__option"]} ${drmFilter === 0 ? classes["dropdown-menu__option--selected"] : ""
                  }`}
                onClick={() => handleDRMOption(0)}
              >
                DRM
              </div>
            </div>
          )}
        </div>
        <input
          className={classes.intoSearchBar}
          type="text"
          placeholder="Buscar juegos"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <img
          className={classes.search}
          src="/img/lupa.PNG"
          alt="search"
          onClick={handleSearch}
        />
      </div>

      <div className={classes.icons}>
        {token && admin &&(
          <img src="/icon/admin.svg" alt="admin" />
        )}

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
