
// import Header from './components/Header';
import Button from '../Button';

function DocBotones() {

  function holamundo() {
    alert("hola");
    console.log("hola mundo")
  }

  return (
    <div>
      <Button
        variant={"short"}
        color={"azul"}
        onClick={holamundo}>
          Hola
        </Button>
        <Button        
        variant={"short"}
        color={"morado"}
        onClick={holamundo}>
          Hola
        </Button>

        <Button        
        variant={"short"}
        color={"morado-azul"}
        onClick={holamundo}>
          Hola
        </Button>

        <Button        
        variant={"short"}
        color={"azul-morado"}
        onClick={holamundo}>
          Hola
        </Button>

        <Button
        variant={"large"}
        color={"azul"}
        onClick={holamundo}>
          Hola
        </Button>
        <Button        
        variant={"large"}
        color={"morado"}
        onClick={holamundo}>
          Hola
        </Button>

        <Button        
        variant={"large"}
        color={"morado-azul"}
        onClick={holamundo}>
          Hola
        </Button>

        <Button        
        variant={"large"}
        color={"azul-morado"}
        onClick={holamundo}>
          Hola
        </Button>

        <Button
        variant={"medium"}
        color={"azul"}
        onClick={holamundo}>
          Hola
        </Button>
        <Button        
        variant={"medium"}
        color={"morado"}
        onClick={holamundo}>
          Hola
        </Button>

        <Button        
        variant={"medium"}
        color={"morado-azul"}
        onClick={holamundo}>
          Hola
        </Button>

        <Button        
        variant={"medium"}
        color={"azul-morado"}
        onClick={holamundo}>
          Hola
        </Button>

    </div>
  )
}

export default DocBotones
