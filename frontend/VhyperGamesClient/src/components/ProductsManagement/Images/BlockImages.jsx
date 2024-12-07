import Button from "../../Buttons/Button";
import classes from "./BlockImages.module.css";

function BlockImages({ gameId, images }) {
  // Constante temporal con datos de imágenes.
  images = [
    { id: 1, url: "/img/cyberpunk.png", alt: "Imagen 1" },
    { id: 2, url: "/img/cyberpunk.png", alt: "Imagen 2" },
    { id: 3, url: "/img/cyberpunk.png", alt: "Imagen 3" },
  ];

  return (
    <div>
      <h2>Imágenes adicionales: </h2>
      <Button
        variant={"large"}
        color={"morado"}
      // onClick={() => console.log(`Modificar imagen con ID: ${image.id}`)}
      >
        Añadir imagen
      </Button>

      {images.map((image) => (
        <div key={image.id} style={{ marginBottom: "20px" }} className={classes.imgBlock}>
          <img
            src={image.url}
            alt={image.alt}
            style={{ width: "150px", height: "150px", display: "block" }}
          />
          <input type="file" />
          <Button
            variant={"large"}
            color={"azul"}
            onClick={() => console.log(`Modificar imagen con ID: ${image.id}`)}
          >
            Modificar
            {/*MANTENGO EL BOTON DE MODIFICAR PORQUE CREO QUE SI QUEREMOS METER UNA IMAGEN EN EL LUGAR x ES MAS FACIL ASI. SI VEIS QUE DA IGUAL BORRAD Y LISTO */}
          </Button>
          <Button
            variant={"large"}
            color={"red"}
            onClick={() => console.log(`Borrar imagen con ID: ${image.id}`)}
          >
            Borrar Imagen
          </Button>
        </div>
      ))}
    </div>
  );
}

export default BlockImages;
