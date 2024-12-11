import classes from "./ContainerManagementPorduct.module.css";
import AddProductButton from "./AddProductButton";
import SearchBarProduct from "./SearchBar/SearchBarProduct";

function ContainerManagementPorduct() {
    return (
        <div className={classes.utilities}>
            <AddProductButton className={classes.button} />
            <SearchBarProduct className={classes.searchBar} />
        </div>
    )
}

export default ContainerManagementPorduct