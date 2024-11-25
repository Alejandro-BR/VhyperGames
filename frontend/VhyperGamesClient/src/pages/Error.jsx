import Error404Message from "../components/errorComponent/Error404Message";
import Title from "../components/titleComponent/Title";


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