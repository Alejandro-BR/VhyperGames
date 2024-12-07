import { useState } from "react";
import classes from "./DeleteModal.module.css";
import Button from "../../Buttons/Button";

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

function DeleteModal({ onClose, onConfirm }) {
    const [confirmationText, setConfirmationText] = useState("");

    const handleInputChange = (e) => {
        setConfirmationText(e.target.value);
    };

    const isValid = confirmationText === "Eliminar";

    return (
        <div className={classes.confirmation}>
            <div className={classes.overlay}>
                <div className={classes.modalContent}>
                    <button className={classes.logoCerrar} onClick={onClose}>
                        <CloseIcon />
                    </button>

                    <p>Si desea eliminar a este usuario escriba "Eliminar"</p>
                    <input
                        type="text"
                        className={classes.confirmationInput}
                        value={confirmationText}
                        onChange={handleInputChange}
                        placeholder="Escribe 'Eliminar'"
                    />

                    {isValid && (
                        <Button className={classes.confirmButton} onClick={onConfirm} variant="short" color="red" children="Eliminar" />
                    )
                    }

                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
