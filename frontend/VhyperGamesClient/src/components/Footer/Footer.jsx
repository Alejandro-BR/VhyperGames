import classes from './Footer.module.css';
import Button from '../Buttons/Button';
import { messageCompany } from '../../helpers/messages';
import { useNavigate } from "react-router-dom";

function Footer() {

  const navigate = useNavigate();

  return (
    <footer className={classes.footer}>
      <div className={classes.leftFooter}>
        <img
          className={classes.imgFooter}
          src="/img/LogoVG.png"
          alt="Logo"
          onClick={() => navigate("/")}
        />
        <div className={classes.text}>
          <h1>VHYPER GAMES</h1>
          <p>© 2024 | VHYPER GAMES | All rights reserved</p>
        </div>
      </div>

      <div className={classes.rightFooter}>

        <div className={classes.buttons}>
          <Button variant="large" color="morado" onClick={() => navigate("/sobre-nosotros")}>
            Sobre nosotros
          </Button>

          <a href="https://bookflix-daw.vercel.app/" target="_blank" rel="noopener noreferrer">
            <Button variant="large" color="gradient-green" >
              BOOKFLIX
            </Button>
          </a>




          <a href="https://github.com/VhyperGames/VhyperGames" target="_blank" rel="noopener noreferrer">
            <Button variant="large" color="azul">
              <span className={classes.logoGit}>< img src="/icon/cib_github.svg" alt="GitHub" /></span>‎ ‎ ‎ GitHub
            </Button>
          </a>
        </div>

        <div className={classes.iconsFooter}>
          <p>Síguenos </p>
          <div className={classes.onlyIcons}>
            <img
              className={classes.icon}
              src="/img/X.PNG"
              alt="X"
              onClick={() => window.open("https://x.com/", "_blank")}
            />

            <img
              className={classes.icon}
              src="/img/Instagram.PNG"
              alt="Instagram"
              onClick={() => window.open("https://www.instagram.com/", "_blank")}
            />

            <img
              className={classes.icon}
              src="/img/linkedin.PNG"
              alt="LinkedIn"
              onClick={() => window.open("https://es.linkedin.com/", "_blank")}
            />
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
