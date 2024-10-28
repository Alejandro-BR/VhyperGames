// import './Button.jsx'
import classes from './Header.module.css';
import Button from './Button';
import { messageCatalog } from '../helpers/messages';

function Header() {

    return (
        <div className={classes.header}>
            <img className={classes.logoImg} src="/img/LogoVG.png" alt="Logo" 
            onClick={() =>  window.scrollTo({ top: 0, behavior: 'smooth' })}/>
            <div className={classes.headerButton}>
                <Button
                    variant={"short"}
                    color={"morado-azul"}
                    onClick={messageCatalog}
                >
                    Catálogo
                </Button>
            </div>

            <div className={classes.searchBar}>
                <img className={classes.menu} src='/img/menu.PNG' alt='menu' onClick={() => alert("Actualmente no tenemos productos en el catálogo. ¡Vuelve pronto!")}/>
                <input className={classes.intoSearchBar} type="text" placeholder="Juegardos pa buscar uwu" />
                <img className={classes.search} src='/img/lupa.PNG' alt='search' onClick={() => alert("Actualmente no tenemos productos en el catálogo. ¡Vuelve pronto!")}/>
            </div>

            <div className={classes.icons}>
                <img className={classes.icon} src='/img/admin.PNG' alt='admin' onClick={() => alert("Esta funcion no esta disponible todavia :(")}/>
                <img className={classes.icon} src='/img/cart.PNG' alt='cart' onClick={() => alert("Esta funcion no esta disponible todavia :(")}/>
                <img className={classes.icon} src='/img/user.PNG' alt='user' />
            </div>

        </div>
    );



}

export default Header;