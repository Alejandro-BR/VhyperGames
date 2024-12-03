
import Title from "../components/Titles/Title";
import Body from "../components/ProductsManagement/Body";
import ProductCardBlock from "../components/ProductsManagement/productCardBlock";

function ProductManagement() {
    return (
        <div className="generalContainer">
            <Title text="PRODUCTOS:" size="3em" color="#fff" align="center" />
            <Body />
            <ProductCardBlock />
        </div>
    )
}

export default ProductManagement;