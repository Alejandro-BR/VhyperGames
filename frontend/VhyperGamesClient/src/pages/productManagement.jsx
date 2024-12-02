
import Title from "../components/titleComponent/Title";
import Body from "../components/productManagement/Body";
import ProductCardBlock from "../components/productManagement/ProductCardBlock";

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