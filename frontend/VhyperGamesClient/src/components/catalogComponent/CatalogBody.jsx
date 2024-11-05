import React, { useState, useEffect } from "react";
import CatalogFilters from "./CatalogFilters";
import BlockGame from "../blockgameComponent/BlockGame";
import Pagination from "./Pagination"; 
import { CATALOG_FILTER } from "../../config";

function CatalogBody() {
    const [juegos, setJuegos] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [searchFilter, setSearchFilter] = useState({
        searchText: "",
        sortCriteria: null,
        drmFree: null,
        genre: null,
        resultsPerPage: 10, // Valor inicial en 10
        page: 1
    }); 

    const fetchJuegos = async (filter) => {
        setLoading(true); 
        try {
            console.log("Enviando filtros a la API:", JSON.stringify(filter, null, 2));
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
        setSearchFilter(prevFilter => ({
            ...prevFilter,
            ...newFilter
        }));
    };

    if (loading) return <p>Cargando juegos...</p>;

    return (
        <>
            <CatalogFilters filters={searchFilter} onFilterChange={handleSearchFilterChange} />
            <div>
                <BlockGame games={juegos} /> 
            </div>
            <Pagination />
        </>
    );
}

export default CatalogBody;
