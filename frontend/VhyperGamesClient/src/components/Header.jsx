// import './Button.jsx'
import classes from './Header.module.css';
import Button from './placeHolders/buttonPlaceHolder';

function Header() {

    return (
        <div className={classes.header}>
            <img className={classes.logoImg} src="/img/LogoVG.png" alt="Logo" />
            <div className={classes.headerButton}>
                <Button />
            </div>

            <div className={classes.searchBar}>
                <img className={classes.menu} src='/img/menu.PNG' alt='menu' />
                <input className={classes.intoSearchBar} type="text" placeholder="Juegardos pa buscar uwu" />
                <img className={classes.search} src='/img/lupa.PNG' alt='search' />
            </div>

            <div className={classes.icons}>
                <img className={classes.icon} src='/img/admin.PNG' alt='admin' />
                <img className={classes.icon} src='/img/cart.PNG' alt='cart'/> 
                <img className={classes.icon} src='/img/user.PNG' alt='user'/> 
            </div>

        </div>
    );



}

export default Header;