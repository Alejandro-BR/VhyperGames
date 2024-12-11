import classes from "./GameRequirements.module.css"
import { useEffect, useState } from "react";
import { GAME_REQUERIMENTS } from "../../../config";

function GameRequeriments({ id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [requeriments, setRequeriments] = useState();

  useEffect(() => {
    if (id === 0) {
      setError("Error al cargar los requisitos");
      setLoading(false);
      return;
    }

    const fetchRequirements = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${GAME_REQUERIMENTS}?id=${id}`);
        if (!response.ok) {
          throw new Error("Ha habido un error al optener los requisitos")
        }
        const data = await response.json();

        setRequeriments({
          os: data.os,
          minOS: data.minOS,
          cpu: data.cpu,
          minCPU: data.minCPU,
          ram: data.ram,
          minRAM: data.minRAM,
          gpu: data.gpu,
          minGPU: data.minGPU,
          directX: data.directX,
          storage: data.storage
        });

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, [id])

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <table className={classes.tableInfo}>
        <thead>
          <tr>
            <th className={classes.ths}>Requisitos mínimos:</th>
            <th className={classes.ths} >Requisitos recomendados:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classes.tds}>CPU: {requeriments.minCPU}</td>
            <td className={classes.tds}>CPU: {requeriments.cpu}</td>
          </tr>
          <tr>
            <td className={classes.tds}>GPU: {requeriments.minGPU}</td>
            <td className={classes.tds}>GPU: {requeriments.gpu}</td>
          </tr>
          <tr>
            <td className={classes.tds}>Sistema operativo: {requeriments.minOS}</td>
            <td className={classes.tds}>Sistema operativo: {requeriments.os}</td>
          </tr>
          <tr>
            <td className={classes.tds}>RAM: {requeriments.minRAM}</td>
            <td className={classes.tds}>RAM: {requeriments.ram}</td>
          </tr>
          <tr>
            <td className={classes.tds}>DirectX: {requeriments.directX}</td>
            <td className={classes.tds}>DirectX: {requeriments.directX}</td>
          </tr>
          <tr>
            <td className={classes.tds}>Almacenamiento: {requeriments.storage}</td>
            <td className={classes.tds}>Almacenamiento: {requeriments.storage}</td>
          </tr>
        </tbody>
      </table>

    </>
  )

};

export default GameRequeriments;