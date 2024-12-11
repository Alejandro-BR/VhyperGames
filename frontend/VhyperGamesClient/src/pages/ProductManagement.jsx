
import Title from "../components/Titles/Title";
import ContainerManagementProduct from "../components/ProductsManagement/ContainerManagementProduct";
import ProductCardBlock from "../components/ProductsManagement/ProductCardBlock/ProductCardBlock";

function ProductManagement() {
    return (
        <div className="generalContainer">
            <Title text="PRODUCTOS:" size="3em" color="#fff" align="center" />
            <ContainerManagementProduct />
            <ProductCardBlock />
        </div>
    )
}

export default ProductManagement;