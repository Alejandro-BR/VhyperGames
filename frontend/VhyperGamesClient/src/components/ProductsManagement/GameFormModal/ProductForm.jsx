import React, { useState, useEffect } from "react";
import classes from "./ProductForm.module.css";
import Button from "../../Buttons/Button"
import { AdminContext } from "../../../context/AdminContext";

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


function ProductForm({ modalPurpose, initialData, onSubmit, onClose }) {

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

    document.addEventListener("input", (e) => {
        if (e.target.tagName === "TEXTAREA" ) {
            e.target.style.height = "auto"; // Reinicia la altura
            e.target.style.height = e.target.scrollHeight + "px"; // Ajusta la altura al contenido
        }
    });


    useEffect(() => {
        if (initialData) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...initialData,
                releaseDate: initialData.releaseDate
                    ? initialData.releaseDate.split("T")[0]
                    : prevFormData.releaseDate,
            }));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        const parsedValue = ["genre", "gameRequirementsId", "drmFree", "price", "stock"].includes(id)
            ? parseInt(value, 10)
            : value;
        setFormData({ ...formData, [id]: parsedValue });
    };

    const handleFileChange = (e) => {
        const { id, files } = e.target;

        if (id === "images") {
            setFormData({
                ...formData,
                images: Array.from(files),
            });
        } else if (id === "img1") {
            setFormData({
                ...formData,
                img1: files[0],
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className={classes.productForm} onSubmit={handleSubmit}>

            <div className={classes.formGroup}>
                <label htmlFor="title">Título:</label>
                <input type="text" id="title" placeholder="Título" value={formData.title} onChange={handleChange} />
            </div>

            <div className={classes.formGroup}>
                <label htmlFor="description">Descripción:</label>
                <textarea id="description" placeholder="Descripción" value={formData.description} onChange={handleChange}></textarea>
            </div>

            <div className={classes.formGroup}>
                <label htmlFor="sinopsis">Sinopsis:</label>
                <textarea id="sinopsis" placeholder="Sinopsis" value={formData.sinopsis} onChange={handleChange}></textarea>
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
                <label htmlFor="gameRequirementsId">Requerimientos del juego</label>
                <select id="gameRequirementsId" value={formData.releasgameRequirementsId} onChange={handleChange}>
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

            <div className={classes.formGroup}>
                <label htmlFor="releaseDate">Fecha de Lanzamiento:</label>
                <input type="date" id="releaseDate" value={formData.releaseDate} onChange={handleChange} />
            </div>

            <div className={classes.formGroup}>
                <label htmlFor="price">Precio:</label>
                <input type="number" id="price" placeholder="Precio" value={formData.price} onChange={handleChange} />
            </div>

            <div className={classes.formGroup}>
                <label htmlFor="stock">Stock:</label>
                <input type="number" id="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} />
            </div>

            <Button variant={"large"} color={"morado-azul"} type="submit">
                {modalPurpose} producto

            </Button>
        </form>

    );
};

export default ProductForm;