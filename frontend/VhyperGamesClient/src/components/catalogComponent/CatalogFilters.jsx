import { useState } from "react";
import clasess from "./CatalogFilters.module.css"

function CatalogFilters() {
  const [orderBy, setOrderBy] = useState("");
  const [license, setLicense] = useState("");
  const [genero, setGenero] = useState("");

  const resetSelections = () => {
    setOrderBy("");
    setLicense("");
    setGenero("");
  };

  return (
    <>
      <div className={clasess.filters}>
        <input
          id="Search"
          type="text"
          placeholder="Buscar"
          className={clasess.filter}
        />
        <div className={clasess.filter}>
          <select
            id="orderBy"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="">Ordenar por:</option>
            <option value="Precio Asc.">Precio Asc.</option>
            <option value="Precio Desc.">Precio Desc.</option>
            <option value="Alfabetico A-Z.">Alfabetico A-Z.</option>
            <option value="Alfabetico Z-A.">Alfabetico Z-A.</option>
          </select>
        </div>

        <div className={clasess.filter}>
          <select
            id="license"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
          >
            <option value="">Licencia:</option>
            <option value="Todos">Todos</option>
            <option value="DRM">DRM</option>
            <option value="DRM-FREE">DRM-FREE</option>
          </select>
        </div>

        <div className={clasess.filter}>
          <select
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="">Genero:</option>
            <option value="RPG de Accion">RPG de Acción</option>
            <option value="Survival horror">Survival horror</option>
            <option value="Aventura-Acción">Aventura-Acción</option>
            <option value="Estrategia">Estrategia</option>
            <option value="Sandbox">Sandbox</option>
            <option value="Simulación">Simulación</option>
            <option value="Plataforma">Plataforma</option>
          </select>
        </div>


        <span
          onClick={resetSelections}
          
        >
          Reiniciar selección
        </span>
      </div>
    </>
  );
}

export default CatalogFilters;
