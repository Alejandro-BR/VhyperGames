import { useContext, useState } from "react";
import classes from "./SearchBarProduct.module.css";
import { AdminContext } from "../../../context/AdminContext";
import Button from "../../Buttons/Button";

function SearchBarProduct() {
  const { GetSearchGame, ResetSearchGame } = useContext(AdminContext); 
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value); 
  };

  const handleSearch = async () => {
    try {
      await GetSearchGame(searchTerm);
    } catch (error) {
      console.error("Error al ejecutar GetSearchGame:", error);
    }
  };

  const handleCancel = () => {
    setSearchTerm(""); 
    ResetSearchGame();
  };

  return (
    <div className={classes.container}>
      <input
        className={classes.searchBar}
        type="text"
        id="product-search"
        name="product-search"
        placeholder="Busca un producto"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button
        variant={"short"}
        color={"morado-azul"}
        onClick={handleSearch}
      >
        Buscar
      </Button>
      <Button
        variant={"short"}
        color={"morado-azul"}
        onClick={handleCancel}
      >
        Cancelar
      </Button>
    </div>
  );
}

export default SearchBarProduct;
