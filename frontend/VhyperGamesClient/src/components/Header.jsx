// import './Button.jsx'
import classes from './Header.module.css';

function Header() {

    return (
        <header>
            
            <img class={classes.logo} src="/img/LogoVG.png" alt="Logo" />
            
            <input class={classes.searchBar} type="text" placeholder="Juegardos" />

        </header>
    );



}

export default Header;