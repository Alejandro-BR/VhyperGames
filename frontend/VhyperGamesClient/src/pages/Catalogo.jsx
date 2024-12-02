import { useState, useEffect } from "react";
import Footer from "../components/footerComponent/Footer";
import Title from "../components/titleComponent/Title";
import CatalogBody from "../components/catalogComponent/CatalogBody";
import { useLocation } from "react-router-dom";

function Catalogo() {
    const location = useLocation();
    const [initialSearchText, setInitialSearchText] = useState("");
    const [initialDrmFree, setInitialDrmFree] = useState(-1);

    useEffect(() => {
        // Extrae los parámetros de la URL cada vez que cambian
        const queryParams = new URLSearchParams(location.search);
        const searchText = queryParams.get("SearchText") || "";
        const drmFree = queryParams.get("DrmFree") !== null ? parseInt(queryParams.get("DrmFree"), 10) : -1;

        console.log("Query Parameters:", location.search);
        console.log("SearchText:", searchText);
        console.log("DrmFree:", drmFree);

        setInitialSearchText(searchText);
        setInitialDrmFree(drmFree);
    }, [location.search]);

    return (
        
        <div>
            <div className="generalContainer">
                <Title text="CATÁLOGO" size="3em" color="#fff" align="center" />
                 <CatalogBody initialSearchText={initialSearchText} initialDrmFree={initialDrmFree} />
            </div>
            <Footer />
        </div>

    )
}

export default Catalogo;