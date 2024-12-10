
import Title from "../components/Titles/Title";
import ContainerManagementPorduct from "../components/ProductsManagement/ContainerManagementPorduct";
import ProductCardBlock from "../components/ProductsManagement/ProductCardBlock/ProductCardBlock";

function ProductManagement() {
    return (
        <div className="generalContainer">
            <Title text="PRODUCTOS:" size="3em" color="#fff" align="center" />
            <ContainerManagementPorduct />
            <ProductCardBlock />
        </div>
    )
}

export default ProductManagement;