import React, { useState, useEffect } from "react";
import CatalogFilters from "./CatalogFilters.jsx";
import classes from "./CatalogStyle.module.css";
import BlockGame from "../Blockgame/BlockGame.jsx";
import Pagination from "./Pagination.jsx";
import { CATALOG_FILTER } from "../../config.js";
import { getVarSessionStorage, updateSessionStorage } from "../../utils/keep.js";

function CatalogBody({ initialSearchText = "", initialDrmFree = -1, initialBit = 0 }) {
    const [juegos, setJuegos] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [searchFilter, setSearchFilter] = useState({
        searchText: initialSearchText,
        sortCriteria: 0,
        drmFree: initialDrmFree,
        genre: -1,
        resultsPerPage: 10,
        page: 1
    });

    useEffect(() => {
        if (initialSearchText || initialDrmFree !== null) {
            setSearchFilter(prevFilter => ({
                ...prevFilter,
                searchText: initialSearchText || prevFilter.searchText,
                drmFree: initialDrmFree !== null ? initialDrmFree : prevFilter.drmFree,
            }));
        }
    }, [initialSearchText, initialDrmFree, initialBit]);

    const CLAVE = "filter";
    const [filtersLoaded, setFiltersLoaded] = useState(false);

    useEffect(() => {
        if (!filtersLoaded) {
            const savedFilter = getVarSessionStorage(CLAVE);
            if (savedFilter) {
                setSearchFilter(savedFilter);
                setSearchText(savedFilter.searchText || "");
            }
            setFiltersLoaded(true);
        }
    }, [filtersLoaded]);

    useEffect(() => {
        setSearchText(initialSearchText || "");
    }, [initialSearchText]);

    useEffect(() => {
        fetchJuegos(searchFilter);
    }, [searchFilter]);

    const fetchJuegos = async (filter) => {
        setLoading(true);
        try {
            let queryParams = new URLSearchParams({
                searchText: filter.searchText || "",
                sortCriteria: filter.sortCriteria || 0,
                drmFree: (filter.drmFree !== undefined && filter.drmFree !== null) ? filter.drmFree : -1,
                genre: filter.genre || -1,
                resultsPerPage: filter.resultsPerPage || 10,
                page: filter.page || 1,
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
            updateSessionStorage(filter, CLAVE);
        } catch (error) {
            console.error('Error al cargar los juegos:', error);
            setJuegos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJuegos(searchFilter);
    }, [searchFilter]);

    // Debounce para searchText
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchText !== searchFilter.searchText) {
                setSearchFilter(prevFilter => ({
                    ...prevFilter,
                    searchText: searchText
                }));
            }
        }, 1000);
    
        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    const handleSearchFilterChange = (newFilter) => {
        if (newFilter.searchText !== undefined && newFilter.sortCriteria !== undefined) {
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
            setSearchFilter(newFilter => ({
                ...newFilter,
                page: 1
            }));
        } else {
            setSearchFilter(prevFilter => ({
                ...prevFilter,
                ...newFilter,
                page: 1
            }));
        }
    };

    const handlePageChange = (newPage) => {
        setSearchFilter(prevFilter => ({
            ...prevFilter,
            page: newPage
        }));
    };

    return (
        <>
            <CatalogFilters filters={{ ...searchFilter, searchText }} onFilterChange={handleSearchFilterChange} />
            <div className={classes.juegardos}>
                {juegos.length !== 0 ? (<BlockGame games={juegos} variant="catalogo" />) : (<p>No se encontraron resultados con esa búsqueda.</p>)}
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
