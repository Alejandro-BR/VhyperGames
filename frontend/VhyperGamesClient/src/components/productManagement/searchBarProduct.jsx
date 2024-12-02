import classes from "./SearchBarProduct.module.css"

function SearchBarProduct() {
    return (
        <div>
            <input className={classes.searchBar} type="text" id="product-search" name="product-search" placeholder="Busca un producto" />
        </div>
    )
}

export default SearchBarProduct