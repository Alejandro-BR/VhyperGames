// import './Button.jsx'
import classes from './Footer.module.css';
import Button from './placeHolders/buttonPlaceHolder';

function Footer() {
  return (
    <div className={classes.footer}>

      <div className={classes.leftFooter}>
        <img className={classes.imgFooter} src="/img/LogoVG.png" alt="Logo" />
        <div className={classes.text} >
          <h1>VHYPER GAMES</h1>
          <p>© 2024 | VHYPER GAMES | All rights reserverd</p>
        </div>
      </div>

      <div className={classes.rightFooter}>
        <div className={classes.icons}>
          <img className={classes.icon} src='/img/X.PNG' alt='X' 
          onClick={() => window.open("https://x.com/", "_blank")}/>
          <img className={classes.icon} src='/img/Instagram.PNG' alt='Instagram'  
          onClick={() => window.open("https://www.instagram.com/", "_blank")}/>
          <img className={classes.icon} src='/img/linkedin.PNG' alt='linkedin' 
          onClick={() => window.open("https://es.linkedin.com/", "_blank")}/>
        </div>

        <div className={classes.footerButtons}>
          <Button/>
          <Button/>
          <Button/>
        </div>
      </div>


    </div>
  )
}

export default Footer