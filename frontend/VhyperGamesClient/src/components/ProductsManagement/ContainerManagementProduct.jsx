import classes from "./ContainerManagementProduct.module.css";
import AddProductButton from "./AddProductButton";
import SearchBarProduct from "./SearchBar/SearchBarProduct";

function ContainerManagementProduct() {
    return (
        <div className={classes.utilities}>
            <AddProductButton className={classes.button} />
            <SearchBarProduct className={classes.searchBar} />
        </div>
    )
}

export default ContainerManagementProduct