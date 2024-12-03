import Error404Message from "../components/Error/Error404Message";
import Title from "../components/Titles/Title";


function Error() {
  return (
    <>
      <div className="generalContainer">
        <Title text="ERROR 404!" size="3em" color="#fff" align="center" />
        <Error404Message />
      </div>
    </>
  );
}

export default Error;