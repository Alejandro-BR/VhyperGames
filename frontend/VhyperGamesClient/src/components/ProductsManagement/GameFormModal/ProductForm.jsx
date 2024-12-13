import { useState, useEffect, useContext, useRef } from "react";
import classes from "./ProductForm.module.css";
import Button from "../../Buttons/Button";
import { AdminContext } from "../../../context/AdminContext";

function ProductForm({ gameId }) {

  const { GetFormGame, updateGameById } = useContext(AdminContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sinopsis: "",
    genre: 0,
    gameRequirementsId: 1,
    drmFree: 0,
    releaseDate: new Date().toISOString().split("T")[0],
    price: 0,
    stock: 0,
    img1: null,
    img1Alt: "",
    images: [],
  });

  const [dataLoaded, setDataLoaded] = useState(false);
  const [updatePromise, setUpdatePromise] = useState(null);
  const [msgColor, setMsgColor] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const timerRef = useRef(null);

  // Mostrar el mensaje
  useEffect(() => {
    if (updatePromise) {
      setShowMsg(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setShowMsg(false);
      }, 2500);
    }
  }, [updatePromise]);

  useEffect(() => {
    if (gameId && !dataLoaded) {
      const fetchGameData = async () => {
        const data = await GetFormGame(gameId);
        if (data) {
          setFormData({
            ...data,
            images: data.images || [],
            releaseDate: data.releaseDate.split("T")[0],
          });
          setDataLoaded(true);
        }
      };
      fetchGameData();
    }
  }, [gameId, GetFormGame, dataLoaded]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const parsedValue = ["genre", "gameRequirementsId", "drmFree", "price", "stock"].includes(id)
      ? value === "" ? 0 : parseInt(value, 10)
      : value;
    setFormData({ ...formData, [id]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (formData.price <= 0) {
      setUpdatePromise("El precio debe ser mayor a 0 (en céntimos).");
      setMsgColor("Error");
      return;
    }

    if (formData.stock < 0) {
      setUpdatePromise("El stock no puede ser menor a 0.");
      setMsgColor("Error");
      return;
    }

    try {
      await updateGameById(formData);
      setUpdatePromise("Juego actualizado con éxito");
      setMsgColor("Success");
    } catch (error) {
      console.error("Error al actualizar el juego:", error);
      setUpdatePromise("Hubo un error al actualizar el juego.");
      setMsgColor("Error");
    }
  };

  return (
    <form className={classes.productForm} onSubmit={handleSubmit}>
      <div className={classes.formGroup}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          className="autoExpand"
        ></textarea>
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="sinopsis">Sinopsis:</label>
        <textarea
          id="sinopsis"
          placeholder="Sinopsis"
          value={formData.sinopsis}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="genre">Género:</label>
        <select id="genre" value={formData.genre} onChange={handleChange}>
          <option value="0">RPG de Acción</option>
          <option value="1">Survival Horror</option>
          <option value="2">Aventura-Acción</option>
          <option value="3">Estrategia</option>
          <option value="4">Sandbox</option>
          <option value="5">Simulación</option>
          <option value="6">Plataforma</option>
        </select>
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="gameRequirementsId">Requerimientos del juego:</label>
        <select
          id="gameRequirementsId"
          value={formData.gameRequirementsId}
          onChange={handleChange}
        >
          <option value="1">Bajos</option>
          <option value="2">Medios</option>
          <option value="3">Altos</option>
        </select>
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="drmFree">DRM Free:</label>
        <select id="drmFree" value={formData.drmFree} onChange={handleChange}>
          <option value="0">No</option>
          <option value="1">Sí</option>
        </select>
      </div>

      <section className={classes.horizontalFormGroup}>
        
        <div className={classes.priceStock}>
        <div className={classes.formGroup}>
          <label htmlFor="releaseDate">Fecha de Lanzamiento:</label>
          <input
            type="date"
            id="releaseDate"
            value={formData.releaseDate}
            className={classes.date}
            onChange={handleChange}
          />
        </div>

          <div className={classes.formGroup}>
            <label htmlFor="price">Precio (Céntimos):</label>
            <input
              type="number"
              id="price"
              min="0"
              placeholder="Precio"
              value={formData.price}
              className={classes.numInput}
              onChange={handleChange}
            />
          </div>

          <div className={classes.formGroup}>
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              min="0"
              placeholder="Stock"
              value={formData.stock}
              className={classes.numInput}
              onChange={handleChange}
            />
          </div>
        </div>

      </section>


      <Button variant={"large"} color={"morado-azul"} type="submit">
        Actualizar
      </Button>
      {updatePromise && showMsg && (
        <div className={msgColor === "Success" ? classes.updateMsgSuccess : classes.updateMsgError}>
          {updatePromise}
        </div>
      )}

    </form>
  );
}

export default ProductForm;
