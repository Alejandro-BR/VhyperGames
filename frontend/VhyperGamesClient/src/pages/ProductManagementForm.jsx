import { useParams } from "react-router-dom";
import ImagesManager from "../components/ProductsManagement/Images/ImagesManager";
import Title from "../components/Titles/Title";
import ProductForm from "../components/ProductsManagement/GameFormModal/ProductForm";
import classes from "../styles/ProductManagementForm.module.css";

function ProductManagementForm() {
  const { id } = useParams();

  return (
    <div className="generalContainer">
      <Title text="Actualizar Producto" size="3em" color="#fff" align="center" />
      <div className={classes.mainContainer}>
        <ProductForm gameId={id} />
        <ImagesManager gameId={id} />
      </div>
    </div>
  );
}

export default ProductManagementForm;
