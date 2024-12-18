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
  const [showAdmin, setShowAdmin] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [drmFilter, setDrmFilter] = useState(-1);
  const [bit, setBit] = useState(0);

  const { token, username, logout, decodedToken } = useAuth();
  const navigate = useNavigate();
  const timerRef = useRef(null);
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

  const handleMouseEnterAdmin = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowAdmin(true);
  };


  const handleMouseLeaveAdmin = () => {
    timerRef.current = setTimeout(() => {
      setShowAdmin(false);
    }, 500);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDRMOption = (drmValue) => {
    setDrmFilter((prevFilter) => (prevFilter === drmValue ? -1 : drmValue));
    setMenuOpen(false);
  };

  const toggleBit = () => {
    setBit(previousState => !previousState)
  }

  const handleSearch = () => {
    toggleBit();
    navigate(`/catalogo?SearchText=${encodeURIComponent(searchText)}&DrmFree=${drmFilter}&Bit=${bit}`);
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

        <div className={classes.adminIconWrapper}>
        {token && (decodedToken?.role === "Admin") && (
          <div className={classes.admin} onMouseEnter={handleMouseEnterAdmin} onMouseLeave={handleMouseLeaveAdmin}>
            <img src="/icon/admin.svg" alt="admin" />
          </div>

        )}

        {token && showAdmin && (
          <div className={classes.adminContainer}>
            <div className={classes.adminConfiguration} 
            onMouseEnter={handleMouseEnterAdmin} 
            onMouseLeave={handleMouseLeaveAdmin}
            onClick={() => navigate("/users-management")}>
              Gestionar Usuario
            </div>
            <div className={classes.adminConfiguration} 
            onMouseEnter={handleMouseEnterAdmin} 
            onMouseLeave={handleMouseLeaveAdmin}
            onClick={() => navigate("/products-management")}>
              Gestionar Productos
            </div>
          </div>
        )}
        </div>
       

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
