import classes from "./Body.module.css";
import AddProductButton from "./AddProductButton";
import SearchBarProduct from "./SearchBar/SearchBarProduct";

// igual habría que cambiar el nombre del componente
function Body() {
    return (
        // No es el mejor classname pero no se me ocurre que poner
        <div className={classes.utilities}>
            <AddProductButton className={classes.button} />
            <SearchBarProduct className={classes.searchBar} />
        </div>
    )
}

export default Body