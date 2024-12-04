import classes from "./SearchBarProduct.module.css"
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";
import { useState, useEffect } from "react";

function SearchBarProduct() {

  const { games, fetchGames } = useContext(AdminContext);

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <input className={classes.searchBar} type="text" id="product-search" name="product-search" placeholder="Busca un producto" />
    </div>
  )
}

export default SearchBarProduct