import classes from "./SearchBarUsers.module.css"
import Button from "../../Buttons/Button"
import { AdminContext } from "../../../context/AdminContext";
import { useContext, useState } from "react";

function SearchBarProduct() {

  const { GetSearchUsers, ResetSearchUsers } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSearch = async () => {
    try {
      await GetSearchUsers(searchTerm);
    } catch (error) {
      console.error("Error al ejecutar GetSearchGame:", error);
    }
  };

  const handleCancel = () => {
    setSearchTerm("");
    ResetSearchUsers();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <div className={classes.container}>
      <input className={classes.searchBar}
        type="text" id="product-search"
        name="product-search"
        placeholder="Busca un usuario"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant={"short"}
        color={"azul"}
        onClick={handleSearch}
      >
        Buscar
      </Button>
      <Button
        variant={"short"}
        color={"azul"}
        onClick={handleCancel}
      >
        Cancelar
      </Button>
    </div>
  )
}

export default SearchBarProduct