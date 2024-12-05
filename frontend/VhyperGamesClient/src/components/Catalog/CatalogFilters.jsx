import classes from "./CatalogFilters.module.css";

function CatalogFilters({ filters, onFilterChange }) {
    const { searchText, sortCriteria, drmFree, genre, resultsPerPage } = filters;

    const handleInputChange = (key, value) => {
        onFilterChange({ [key]: value });
    };

    return (
        <div className={classes.container}>
            <div className={classes.filters}>
                <div className={classes.filterItem}>
                    <input
                        id="Search"
                        type="text"
                        placeholder="Buscar"
                        value={searchText || ""}
                        onChange={(e) => handleInputChange("searchText", e.target.value)}
                        className={classes.filter}
                    />
                </div>

                <div className={classes.filterItem}>
                    <select
                        id="orderBy"
                        value={sortCriteria || ""}
                        onChange={(e) => handleInputChange("sortCriteria", e.target.value)}
                        className={classes.filter}
                    >
                        {/* <option value="" disabled defaultValue>Ordenar por:</option> */}
                        <option value="0" defaultValue>Alfabetico A-Z</option>
                        <option value="1">Alfabetico Z-A</option>
                        <option value="3" >Precio Ascendente</option>
                        <option value="2">Precio Descendente</option>
                    </select>
                </div>

                <div className={classes.filterItem}>
                    <label htmlFor="license">Tipo de licencia: </label>
                    <select
                        id="license"
                        value={drmFree || ""}
                        onChange={(e) => handleInputChange("drmFree", e.target.value)}
                        className={classes.filter}
                    >
                        <option value="-1">Todos</option>
                        <option value="0">DRM</option>
                        <option value="1">DRM-FREE</option>
                    </select>
                </div>

                <div className={classes.filterItem}>
                    <select
                        id="genero"
                        value={genre || ""}
                        onChange={(e) => handleInputChange("genre", e.target.value)}
                        className={classes.filter}
                    >
                        <option value="-1" disabled defaultValue>Género:</option>
                        <option value="0">RPG de Acción</option>
                        <option value="1">Survival Horror</option>
                        <option value="2">Aventura-Acción</option>
                        <option value="3">Estrategia</option>
                        <option value="4">Sandbox</option>
                        <option value="5">Simulación</option>
                        <option value="6">Plataforma</option>
                    </select>
                </div>

                <div className={classes.filterItem}>
                    <label htmlFor="productsPerPage">Elementos por página: </label>
                    <select
                        id="productsPerPage"
                        value={resultsPerPage || 10} // Usa 10 como valor predeterminado si resultsPerPage es null o undefined
                        onChange={(e) => handleInputChange("resultsPerPage", parseInt(e.target.value, 10))}
                        className={classes.filter}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>

                <div className={classes.filterItem}>
                    <button onClick={() => onFilterChange({ searchText: "", sortCriteria: 0, drmFree: -1, genre: -1, resultsPerPage: 10, page: 1 })} className={classes.resetButton}>
                        Limpiar selección
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CatalogFilters;
