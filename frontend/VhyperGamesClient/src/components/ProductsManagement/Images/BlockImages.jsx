import Button from "../../Buttons/Button";

function BlockImages() {
  // Constante temporal con datos de imágenes.
  const images = [
    { id: 1, url: "/img/cyberpunk.png", alt: "Imagen 1" },
    { id: 2, url: "/img/cyberpunk.png", alt: "Imagen 2" },
    { id: 3, url: "/img/cyberpunk.png", alt: "Imagen 3" },
  ];

  return (
    <div>
      <h2>Aquí van todas las imágenes</h2>
      {images.map((image) => (
        <div key={image.id} style={{ marginBottom: "20px" }}>
          <img
            src={image.url}
            alt={image.alt}
            style={{ width: "150px", height: "150px", display: "block" }}
          />
          <Button
            variant={"large"}
            color={"azul"}
            onClick={() => console.log(`Modificar imagen con ID: ${image.id}`)}
          >
            Modificar
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
