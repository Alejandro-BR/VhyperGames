import ImagesManager from "../components/ProductsManagement/Images/ImagesManager"
import Title from "../components/Titles/Title";
import ProductForm from "../components/ProductsManagement/GameFormModal/ProductForm";

function ProductManagementForm() {
    return (
        <div className="generalContainer">
            <Title text="?:" size="3em" color="#fff" align="center" />
            <ProductForm />
            <ImagesManager />
        </div>
    )
}

export default ProductManagementForm;