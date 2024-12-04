import { useContext, useState, useEffect } from "react";
import classes from "./SearchBarProduct.module.css";
import { AdminContext } from "../../../context/AdminContext";
import Button from "../../Buttons/Button";

function SearchBarProduct() {
  const { GetSearchGame } = useContext(AdminContext); // Obtén la función del contexto
  const [searchTerm, setSearchTerm] = useState(""); // Estado local para el valor del input

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    try {
      await GetSearchGame(value); // Espera a que se complete la búsqueda
    } catch (error) {
      console.error("Error al ejecutar GetSearchGame:", error);
    }
  };


  useEffect(() => {
    // Si quieres realizar algo cuando el componente se monta
    // Ejemplo: inicializar la búsqueda
    GetSearchGame(searchTerm);
  }, []);

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
        onClick={() => alert("Hola")}>
        Buscar
      </Button>
      <Button
        variant={"short"}
        color={"morado-azul"}
        onClick={() => alert("Hola")}>
        Cancelar
      </Button>
    </div>
  );
}

export default SearchBarProduct;
