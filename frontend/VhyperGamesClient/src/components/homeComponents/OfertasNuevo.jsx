import { useState } from 'react';
import Button from '../buttonComponent/Button';
import style from './OfertasNuevo.module.css';


function OfertasNuevos() {
  const [isOfertas, setIsOfertas] = useState(true);
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

      <div className={style.title}>
        <h1 className={style.palito}>❙</h1>
        <h1>{isOfertas ? "OFERTAS" : "NUEVOS"}</h1>
      </div>

      <h2 className={style.text}>{isOfertas ? "Ahora mismo no hay juegos de oferta en la página vuelve pronto ;)"
        : "Ahora mismo no hay juegos nuevos en la página vuelve pronto ;)"}</h2>

    </>

  )

}

export default OfertasNuevos;
