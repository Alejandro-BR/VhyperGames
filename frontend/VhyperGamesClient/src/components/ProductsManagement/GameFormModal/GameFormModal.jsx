import React, { useState, useEffect } from "react";
import classes from "./GameFormModal.module.css";
import Button from "../../Buttons/Button"
import { AdminContext } from "../../../context/AdminContext";

// TENIENDO EN CUENTA QUE EL FORMULARIO ES IDÉNTICO PARA AÑADIR Y EDITAR
// CREO QUE LO IDEAL ES HACER UN SOLO COMPONENTE Y METERLE LA LOGICA COMO PARAMETRO

const CloseIcon = () => (
    <svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_904_312)">
            <path d="M31 26.7857L27.7857 30L16 18.2143L4.21429 30L1 26.7857L12.7857 15L1 3.21429L4.21429 0L16 11.7857L27.7857 0L31 3.21429L19.2143 15L31 26.7857Z" fill="url(#paint0_linear_904_312)" />
        </g>
        <defs>
            <filter id="filter0_d_904_312" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_904_312" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_904_312" result="shape" />
            </filter>
            <linearGradient id="paint0_linear_904_312" x1="1" y1="15" x2="31" y2="15" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5C74E1" />
                <stop offset="1" stopColor="#A440D2" />
            </linearGradient>
        </defs>
    </svg>
);

function GameFormModal({ modalPurpose, initialData, onSubmit, onClose }) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        sinopsis: "",
        genre: "0",
        gameRequirementsId: "1",
        drmFree: "0",
        releaseDate: "",
        price: "",
        stock: "",
        img1: null,
        img1Alt: "",
        images: [],
    });

    useEffect(() => {
        if (initialData) {
            setFormData({ ...formData, ...initialData });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFileChange = (e) => {
        const { id, files } = e.target;
        setFormData({ ...formData, [id]: files });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    console.log(formData);

    return (
        <div className={classes.modalForm}>
            <div className={classes.modalOverlay}>
                <form className={classes.productForm} onSubmit={handleSubmit}>

                    <button className={classes.logoCerrar} onClick={onClose}>
                        <CloseIcon />
                    </button>

                    <div className={classes.formGroup}>
                        <label htmlFor="title">Título:</label>
                        <input type="text" id="title" placeholder="Título" value={formData.title} onChange={handleChange} />
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="description">Descripción:</label>
                        <textarea id="description" placeholder="Descripción" onChange={handleChange}></textarea>
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="sinopsis">Sinopsis:</label>
                        <textarea id="sinopsis" placeholder="Sinopsis" onChange={handleChange}></textarea>
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="genre">Género:</label>
                        <select id="genre">
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
                        <label htmlFor="gameRequirementsId">Requerimientos del juego</label>
                        <select id="gameRequirementsId">
                            <option value="1">Bajos</option>
                            <option value="2">Medios</option>
                            <option value="3">Altos</option>
                        </select>
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="drmFree">DRM Free:</label>
                        <select id="drmFree">
                            <option value="0">No</option>
                            <option value="1">Sí</option>
                        </select>
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="releaseDate">Fecha de Lanzamiento:</label>
                        <input type="date" id="releaseDate" />
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="price">Precio:</label>
                        <input type="number" id="price" placeholder="Precio" onChange={handleChange} />
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="stock">Stock:</label>
                        <input type="number" id="stock" placeholder="Stock" onChange={handleChange} />
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="img1">Carátula:</label>
                        <input type="file" id="img1" onChange={handleFileChange} />
                    </div>

                    <div className={classes.formGroup}>
                        <label for="img1Alt">Texto alternativo carátula:</label>
                        <input type="text" id="img1Alt" onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="images">Imágenes:</label>
                        <input type="file" id="images" multiple onChange={handleFileChange} />
                    </div>

                    <Button variant={"large"} color={"morado-azul"} type="submit">
                        {modalPurpose} producto

                    </Button>
                </form>
            </div >
        </div >
    );
};

export default GameFormModal;
