import classes from './Footer.module.css';
import Button from '../buttonComponent/Button';
import { messageAboutUs, messageCompany } from '../../helpers/messages';

function Footer() {
  return (
    <footer>
      <div className={classes.leftFooter}>
        <img
          className={classes.imgFooter}
          src="/img/LogoVG.png"
          alt="Logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
        <div className={classes.text}>
          <h1>VHYPER GAMES</h1>
          <p>© 2024 | VHYPER GAMES | All rights reserved</p>
        </div>
      </div>

      <div className={classes.rightFooter}>
        <div className={classes.filas}>
          <div className={classes.fila}>
            <img
              className={classes.icon}
              src="/img/X.PNG"
              alt="X"
              onClick={() => window.open("https://x.com/", "_blank")}
            />
            <Button variant="large" color="morado" onClick={messageAboutUs}>
              Sobre nosotros
            </Button>
          </div>
          <div className={classes.fila}>
            <img
              className={classes.icon}
              src="/img/Instagram.PNG"
              alt="Instagram"
              onClick={() => window.open("https://www.instagram.com/", "_blank")}
            />
            <Button variant="large" color="morado" onClick={messageCompany}>
              Empresa
            </Button>
          </div>
          <div className={classes.fila}>
            <img
              className={classes.icon}
              src="/img/linkedin.PNG"
              alt="LinkedIn"
              onClick={() => window.open("https://es.linkedin.com/", "_blank")}
            />
            <a href="https://github.com/VhyperGames" target="_blank" rel="noopener noreferrer">
              <Button variant="large" color="azul">
                <span className={classes.logoGit}>< img src="/icon/cib_github.svg" alt="GitHub" /></span>GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
