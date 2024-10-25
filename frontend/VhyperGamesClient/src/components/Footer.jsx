// import './Button.jsx'
import classes from './Footer.module.css';

function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.leftFooter}>
        <img className={classes.imgFooter} src="/img/LogoVG.png" alt="Logo" />
        <h1 className={classes.text}>VHYPER GAMES</h1>
        <p className={classes.text}>© 2024 | VHYPER GAMES | All rights reserverd</p>
      </div>

      <div className={classes.rightFooter}>
       

      </div>


    </div>
  )
}

export default Footer