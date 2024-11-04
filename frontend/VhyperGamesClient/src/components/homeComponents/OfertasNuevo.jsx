import { useState, useEffect } from 'react';
import Button from '../buttonComponent/Button';
import BlockGame from '../blockgameComponent/BlockGame';
import style from './OfertasNuevo.module.css';
import { CATALOG_NEW_RELEASES, CATALOG_SALES } from '../../config';

function OfertasNuevos() {
  const [isOfertas, setIsOfertas] = useState(true);
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setJuegos([]);

    const url = isOfertas ? CATALOG_SALES : CATALOG_NEW_RELEASES;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la API');
        }
        return response.json();
      })
      .then((data) => {
        setJuegos(data);
        setLoading(false);
      })
      .catch(() => {
        setJuegos([]);
        setLoading(false);
      });
  }, [isOfertas]);

  return (
    <>

      <div className={style.buttons}>
        <Button
          variant={"short"}
          color={"morado-azul"}
          onClick={() => setIsOfertas(true)}
        >
          Ofertas
        </Button>
        <Button
          variant={"short"}
          color={"azul-morado"}
          onClick={() => setIsOfertas(false)}
        >
          Nuevos
        </Button>
      </div>
      <div className={style.contenedor}>

        <div className={style.title}>
          <h1 className={style.palito}>❙</h1>
          <h1>{isOfertas ? "OFERTAS" : "NUEVOS"}</h1>
        </div>

        <div className={style.juegos}>
          {loading ? (
            <h2 className={style.text}>Cargando juegos...</h2>
          ) : juegos.length === 0 ? (
            <h2 className={style.text}>
              {isOfertas
                ? "Ahora mismo no hay juegos de oferta en la página, vuelve pronto ;)"
                : "Ahora mismo no hay juegos nuevos en la página, vuelve pronto ;)"}
            </h2>
          ) : (
            <BlockGame games={juegos} />
          )}
        </div>

      </div>

    </>
  );
}

export default OfertasNuevos;
