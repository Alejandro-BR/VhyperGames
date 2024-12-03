import classes from "./SearchBarUsers.module.css"

function SearchBarProduct() {
    return (
        <div>
            <input className={classes.searchBar} type="text" id="product-search" name="product-search" placeholder="Busca un usuario" />
        </div>
    )
}

export default SearchBarProduct