import React, { useState, useEffect } from "react";
import CatalogFilters from "./CatalogFilters";
import classes from "./CatalogStyle.module.css";
import BlockGame from "../blockgameComponent/BlockGame";
import Pagination from "./Pagination"; 
import { CATALOG_FILTER } from "../../config";

function CatalogBody() {
    const [juegos, setJuegos] = useState([]); 
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [searchFilter, setSearchFilter] = useState({
        searchText: "",
        sortCriteria: 0,
        drmFree: -1,
        genre: -1,
        resultsPerPage: 10,
        page: 1
    });
 
    const fetchJuegos = async (filter) => {
        setLoading(true); 
        try {
            const queryParams = new URLSearchParams({
                searchText: filter.searchText,
                sortCriteria: filter.sortCriteria,
                drmFree: filter.drmFree,
                genre: filter.genre,
                resultsPerPage: filter.resultsPerPage,
                page: filter.page
            }).toString();

            const response = await fetch(`${CATALOG_FILTER}?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
    
            const data = await response.json();
            setJuegos(Array.isArray(data.games) ? data.games : []);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error al cargar los juegos:', error);
            setJuegos([]);
        } finally {
            setLoading(false); 
        }
    };

    // Debounce para searchText
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchFilter(prevFilter => ({
                ...prevFilter,
                searchText: searchText
            }));
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    useEffect(() => {
        fetchJuegos(searchFilter); 
    }, [searchFilter]);

    const handleSearchFilterChange = (newFilter) => {
        if (newFilter.searchText !== undefined && newFilter.sortCriteria !== undefined) {
            // Si todos los valores están presentes en `newFilter`, es un reinicio
            setSearchText("");
            setSearchFilter({
                searchText: "",
                sortCriteria: 0,
                drmFree: -1,
                genre: -1,
                resultsPerPage: 10,
                page: 1
            });
        } else if (newFilter.searchText !== undefined) {
            setSearchText(newFilter.searchText);
        } else {
            setSearchFilter(prevFilter => ({
                ...prevFilter,
                ...newFilter
            }));
        }
    };
    

    const handlePageChange = (newPage) => {
        setSearchFilter(prevFilter => ({
            ...prevFilter,
            page: newPage
        }));
    };

    if (loading) return <p>Cargando juegos...</p>;

    return (
        <>
            <CatalogFilters filters={{ ...searchFilter, searchText }} onFilterChange={handleSearchFilterChange} />
            <div className={classes.juegardos}>
                <BlockGame games={juegos} variant="catalogo" /> 
            </div>
            <Pagination 
                currentPage={searchFilter.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}

export default CatalogBody;