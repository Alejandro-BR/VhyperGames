import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { CATALOG_FILTER } from "../../../config";
import classes from "./ProductCardBlock.module.css";

// function ProductCardBlock() {
// const [juegos, setJuegos] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchGames = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`${CATALOG_FILTER}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Error ${response.status}: ${response.statusText}`);
//             }

//             const data = await response.json();
//             setJuegos(Array.isArray(data.games) ? data.games : []);
//         } catch (error) {
//             console.error("Error al cargar los juegos:", error);
//             setJuegos([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchGames();
//     }, []);

//     if (loading) return <p>Cargando juegos...</p>;


function ProductCardBlock() {
    return (
        <section className={classes.productsList}>
            {/* {juegos.map((game) => ( <div key={game.id}> */}
            <ProductCard
            // imgUrl={game.imgUrl || "/default-image.png"} // Asegurarte de que hay un valor
            // title={game.title || "No title"} // Asegurarte de que el título es una cadena
            // price={game.price || 0} // Asegurarte de que el precio es un número
            // stock={game.stock || 0} // Asegurarte de que el stock es un número
            // id={game.id}
            />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            {/* </div>))} */}
        </section>
    );
}

export default ProductCardBlock;
