import ButtonShort from './components/ButtonShort';
import ButtonLarge from './components/ButtonLarge';
// import Header from './components/Header';

function App2() {

  function holamundo() {
    alert("hola");
    console.log("hola mundo")
  }

  return (
    <div>
      <ButtonShort onClick={holamundo}> OFERTAS </ButtonShort>
      <ButtonLarge 
        onClick={holamundo}
        variant={"azul"}
      >
        Botón 1
      </ButtonLarge>
    </div>
  )
}

export default App2
