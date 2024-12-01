
import Title from "../components/titleComponent/Title";
import ProductCardBlock from "../components/productManagement/productCardBlock";
import AddProductButton from "../components/productManagement/AddProductButton";
import SearchBarProduct from "../components/productManagement/SearchBarProduct";

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