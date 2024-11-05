import classes from "./CatalogFilters.module.css";

function CatalogFilters({ filters, onFilterChange }) {
    const { searchText, sortCriteria, drmFree, genre, resultsPerPage, page } = filters;

    const handleInputChange = (key, value) => {
        console.log(`handleInputChange - ${key}:`, value);
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
                        <option value="">Ordenar por:</option>
                        <option value="lowest price">Precio Asc.</option>
                        <option value="highest price">Precio Desc.</option>
                        <option value="a-z">Alfabetico A-Z.</option>
                        <option value="z-a">Alfabetico Z-A.</option>
                    </select>
                </div>

                <div className={classes.filterItem}>
                    <select
                        id="license"
                        value={drmFree ? "DRM-FREE" : "Todos"}
                        onChange={(e) => handleInputChange("drmFree", e.target.value === "DRM-FREE")}
                        className={classes.filter}
                    >
                        <option value="Todos">Todos</option>
                        <option value="DRM">DRM</option>
                        <option value="DRM-FREE">DRM-FREE</option>
                    </select>
                </div>

                <div className={classes.filterItem}>
                    <select
                        id="genero"
                        value={genre || ""}
                        onChange={(e) => handleInputChange("genre", e.target.value)}
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
                    <button onClick={() => onFilterChange({ searchText: "", sortCriteria: null, drmFree: null, genre: null, resultsPerPage: 10, page: 1 })} className={classes.resetButton}>
                        Reiniciar selección
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CatalogFilters;
