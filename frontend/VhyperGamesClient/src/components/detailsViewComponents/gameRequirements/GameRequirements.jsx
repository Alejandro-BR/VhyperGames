import classes from "./GameRequirements.module.css"
import { useEffect, useState } from "react";
import { GAME_REQUERIMENTS } from "../../../config";
import "./GameRequirements.module.css"

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
      <table>
        <thead>
          <tr>
            <th>Requisitos mínimos:</th>
            <th>Requisitos recomendados:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CPU: {requeriments.minCPU}</td>
            <td>CPU: {requeriments.cpu}</td>
          </tr>
          <tr>
            <td>GPU: {requeriments.minGPU}</td>
            <td>GPU: {requeriments.gpu}</td>
          </tr>
          <tr>
            <td>Sistema operativo: {requeriments.minOS}</td>
            <td>Sistema operativo: {requeriments.os}</td>
          </tr>
          <tr>
            <td>RAM: {requeriments.minRAM}</td>
            <td>RAM: {requeriments.ram}</td>
          </tr>
          <tr>
            <td>DirectX: {requeriments.directX}</td>
            <td>DirectX: {requeriments.directX}</td>
          </tr>
          <tr>
            <td>Almacenamiento: {requeriments.storage}</td>
            <td>Almacenamiento: {requeriments.storage}</td>
          </tr>
        </tbody>
      </table>

    </>
  )

};

export default GameRequeriments;