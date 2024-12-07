import Button from "../../Buttons/Button"
import BlockImages from "./BlockImages";

function ImagesManager({ gameId }) {

  return (<div >
    <div>
      {/* Portada */}
      <img src="/img/cyberpunk.png" alt="Imagen portada"></img>
      <Button
        variant={"large"}
        color={"azul"}
        onClick={console.log("Hola")}
      >
        Modificar Carátula
      </Button>
    </div>
    <BlockImages/>
  </div>);
}

export default ImagesManager;