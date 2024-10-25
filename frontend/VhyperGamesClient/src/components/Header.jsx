// import './Button.jsx'
import classes from './Header.module.css';

function Header() {

    return (
        <div className={classes.header}>
            <img className={classes.logoImg} src="/img/LogoVG.png" alt="Logo" />


            <input className={classes.searchBar} type="text" placeholder="Juegardos" />
        </div>
    );



}

export default Header;