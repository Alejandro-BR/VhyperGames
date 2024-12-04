import React, { useState } from "react";
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
            <filter id="filter0_d_904_312" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_904_312" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_904_312" result="shape" />
            </filter>
            <linearGradient id="paint0_linear_904_312" x1="1" y1="15" x2="31" y2="15" gradientUnits="userSpaceOnUse">
                <stop stop-color="#5C74E1" />
                <stop offset="1" stop-color="#A440D2" />
            </linearGradient>
        </defs>
    </svg>
);

function GameFormModal(
    {
        modalPurpose,   // Propósito del modal. Es decir, Añadir o Editar. Igual puede usarse en un condicional para la lógica?
        onClose         // Permite cerrar el modal
    }
) {

    if (modalPurpose === "Añadir") {

    } if (modalPurpose === "Editar") {

    }

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [img1, setImg1] = useState(null);

    // Estado para almacenar los archivos
    const [files, setFiles] = useState([]);

    // Manejar cambios en el input file
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles(selectedFiles); // Guardar en el estado
    };

    // const { game, postGame } = useContext(AdminContext);

    return (
        <div className={classes.modalForm}>
            <div className={classes.modalOverlay}>
                <form className={classes.productForm}
                >
                    <button className={classes.logoCerrar} onClick={onClose}>
                        <CloseIcon />
                    </button>


                    <div className={classes.formGroup}>
                        <label htmlFor="title">Título: </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Título"
                        />
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="price">Precio: </label>
                        <input
                            type="number"
                            id="price"
                            placeholder="Precio"
                        />
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="stock">Stock: </label>
                        <input
                            type="number"
                            id="stock"
                            placeholder="Stock"
                        />
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="img1">Carátula:</label>
                        <input type="file" id="img1" />
                    </div>

                    <div className={classes.formGroup}>
                        <label for="img2">Imágenes:</label>
                        <input
                            type="file"
                            id="img2"
                            multiple="true"
                            onChange={handleFileChange} />
                    </div>


                    <div className={classes.formGroup}>
                        <label for="img1Alt">Texto alternativo carátula:</label>
                        <input type="text" id="img1Alt" />
                    </div>

                    <div className={classes.formGroup}>
                        <div className={classes.verticalFormGroup}>
                            <label for="recommendedRequirements">Requisitos recomendados:</label>
                            <textarea
                                id="recommendedRequirements"
                                placeholder="Requisitos recomendados"
                            />
                        </div>

                        <div className={classes.verticalFormGroup}>
                            <label for="minimumRequirements">Requisitos mínimos:</label>
                            <textarea
                                id="minimumRequirements"
                                placeholder="Requisitos mínimos"
                            />
                        </div>
                    </div>

                    <div className={classes.verticalFormGroup}>
                        <label for="description">Descripción:</label>
                        <textarea
                            id="description"
                            placeholder="Descripción"
                        />
                    </div>

                    <Button
                        variant={"large"}
                        color={"morado-azul"}>
                        {modalPurpose} producto

                    </Button>

                </form>

            </div>

        </div>

    );
};

export default GameFormModal
