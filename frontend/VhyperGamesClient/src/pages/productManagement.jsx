
import Title from "../components/titleComponent/Title";
import ProductCardBlock from "../components/productManagementComponents/productCardBlock";
import AddProductButton from "../components/productManagementComponents/AddProductButton";
import SearchBarProduct from "../components/productManagementComponents/SearchBarProduct";

function ProductManagement() {
    return (

        <div>
            <div className="generalContainer">
                <Title text="PRODUCTOS:" size="3em" color="#fff" align="center" />
                <AddProductButton />
                <SearchBarProduct />
                <ProductCardBlock />
            </div>
        </div>

    )
}

export default ProductManagement;