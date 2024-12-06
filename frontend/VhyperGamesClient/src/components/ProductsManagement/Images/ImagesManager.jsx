import Button from "../../Buttons/Button"
import BlockImages from "./BlockImages";

function ImagesManager() {

  return (<div >
    <div>
      {/* Portada */}
      <img src="/img/cyberpunk.png" alt="Imagen portada"></img>
      <Button
        variant={"large"}
        color={"red"}
        onClick={console.log("Hola")}
      >
        Modificar imagen
      </Button>
    </div>
    <BlockImages/>
  </div>);
}

export default ImagesManager;