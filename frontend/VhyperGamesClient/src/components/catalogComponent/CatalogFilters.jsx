import { useState, useEffect } from "react";
import classes from "./CatalogFilters.module.css";

function CatalogFilters({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [license, setLicense] = useState("");
  const [genero, setGenero] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const resetSelections = () => {
    setSearch("");
    setOrderBy("");
    setLicense("");
    setGenero("");
    setItemsPerPage(10); 
    setPage(1); 
  };

  const applyFilters = () => {
    const filters = { search, orderBy, license, genero, itemsPerPage, page };
    console.log("Filtros enviados desde CatalogFilters:", filters);
    onFilterChange(filters);
};

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  };

  return (
    <div className={classes.container}>
      <div className={classes.filters}>
        <div className={classes.filterItem}>
          <input
            id="Search"
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={classes.filter}
          />
        </div>

        <div className={classes.filterItem}>
          <select
            id="orderBy"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            className={classes.filter}
          >
            <option value="">Ordenar por:</option>
            <option value="Precio Asc.">Precio Asc.</option>
            <option value="Precio Desc.">Precio Desc.</option>
            <option value="Alfabetico A-Z.">Alfabetico A-Z.</option>
            <option value="Alfabetico Z-A.">Alfabetico Z-A.</option>
          </select>
        </div>

        <div className={classes.filterItem}>
          <select
            id="license"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className={classes.filter}
          >
            <option value="">Licencia:</option>
            <option value="Todos">Todos</option>
            <option value="DRM">DRM</option>
            <option value="DRM-FREE">DRM-FREE</option>
          </select>
        </div>

        <div className={classes.filterItem}>
          <select
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className={classes.filter}
          >
            <option value="">Genero:</option>
            <option value="RPG de Acción">RPG de Acción</option>
            <option value="Survival horror">Survival horror</option>
            <option value="Aventura-Acción">Aventura-Acción</option>
            <option value="Estrategia">Estrategia</option>
            <option value="Sandbox">Sandbox</option>
            <option value="Simulación">Simulación</option>
            <option value="Plataforma">Plataforma</option>
          </select>
        </div>

        <div className={classes.filterItem}>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value, 10))}
            className={classes.filter}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        <div className={classes.filterItem}>
          <button onClick={resetSelections} className={classes.resetButton}>
            Reiniciar selección
          </button>
        </div>
      </div>
    </div>
  );
}

export default CatalogFilters;
