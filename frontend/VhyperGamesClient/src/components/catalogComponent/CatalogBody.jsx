import React, { useEffect, useState } from "react";
import CatalogFilters from "./CatalogFilters";
import BlockGame from "../blockgameComponent/BlockGame";
import Pagination from "./Pagination"; 
import { CATALOG_FILTER } from "../../config";

function BodyCatalog() {
    const [juegos, setJuegos] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [searchFilter, setSearchFilter] = useState({}); 

    
    const fetchJuegos = async (filter) => {
        setLoading(true); 
        try {
            console.log("Enviando filtros a la API:", JSON.stringify(filter, null, 2)); // Agrega este console.log
            const response = await fetch(CATALOG_FILTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filter)
            });
    
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
    
            const data = await response.json();
            setJuegos(data); 
        } catch (error) {
            console.error('Error al cargar los juegos:', error);
        } finally {
            setLoading(false); 
        }
    };
    

    useEffect(() => {
        fetchJuegos(searchFilter); 
    }, [searchFilter]);
    
    const handleSearchFilterChange = (newFilter) => {
        const formattedFilter = {
            searchText: newFilter.search || "",
            sortCriteria: newFilter.orderBy || null,
            drmFree: newFilter.license === "DRM-FREE" ? true : null,
            genre: newFilter.genero || null,
            resultsPerPage: newFilter.itemsPerPage || 10,
            page: newFilter.page || 1
        };
        console.log("handleSearchFilterChange configurando searchFilter con:", formattedFilter);
        setSearchFilter(formattedFilter);
    };

    if (loading) return <p>Cargando juegos...</p>;

    return (
        <div style={{ height: '80vh' }}>

            <CatalogFilters onFilterChange={handleSearchFilterChange} />
            <div>
                <BlockGame games={juegos} /> 
            </div>
            <Pagination />
        </div>
    );
}

export default BodyCatalog;
