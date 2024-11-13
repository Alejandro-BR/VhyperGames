
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
      <div>
        <h1>Requisitos minimos</h1>
        <div>CPU:  {requeriments.minCPU}</div>
        <div>GPU:  {requeriments.minGPU}</div>
        <div>Sistema operativo:  {requeriments.minOS}</div>
        <div>RAM:  {requeriments.minRAM}</div>
        <div>DirectX:  {requeriments.directX}</div>
        <div>Almacenamiento:  {requeriments.storage}</div>
      </div>

      <div>
        <h1>Requisitos recomendados</h1>
        <p>CPU:  {requeriments.cpu}</p>
        <div>GPU:  {requeriments.gpu}</div>
        <div>Sistema operativo: {requeriments.os}</div>
        <div>RAM:  {requeriments.ram}</div>
        <div>DirectX:  {requeriments.directX}</div>
        <div>Almacenamiento:  {requeriments.storage}</div>
      </div>
    </>
  )

};

export default GameRequeriments;