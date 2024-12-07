import ImagesManager from "../components/ProductsManagement/Images/ImagesManager"
import Title from "../components/Titles/Title";
import ProductForm from "../components/ProductsManagement/GameFormModal/ProductForm";
import classes from "../styles/ProductManagementForm.module.css"

function ProductManagementForm() {
    return (
        <div className="generalContainer">
            <Title text="?:" size="3em" color="#fff" align="center" />
            <div className={classes.mainContainer}>
                <ProductForm />
                <ImagesManager />
            </div>
        </div>
    )
}

export default ProductManagementForm;