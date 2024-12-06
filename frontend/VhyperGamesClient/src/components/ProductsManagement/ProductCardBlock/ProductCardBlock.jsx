import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import classes from "./ProductCardBlock.module.css";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";

function ProductCardBlock() {

  const { games, fetchGames } = useContext(AdminContext);

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <section className={classes.productsList}>
      {games.length > 0 ? (
        games.map((game) => {
          return (
            <ProductCard
              key={game.id}
              id={game.id}
              imgUrl={game.imageGame.imageUrl}
              altText={game.imageGame.altText}
              title={game.title}
              price={game.price}
              stock={game.stock}
            />
          );
        })
      ) : (
        <p>Cargando juegos...</p>
      )}
    </section>
  );
}

export default ProductCardBlock;
