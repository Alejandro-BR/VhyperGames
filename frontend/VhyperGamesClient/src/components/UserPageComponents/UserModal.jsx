import classes from "./UserModal.module.css"
import Button from "../buttonComponent/Button";

function UserModal({ onClose }) {
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.userModal}>
                <button className={classes.logoCerrar} onClick={onClose}>
                    <img src="/icon/cerrar-icon.svg" alt="icono cerrar" />
                </button>

                <div className={classes.inputGroup}>
                    <input
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre"
                        type="text"
                        required
                    />
                </div>

                <div className={classes.inputGroup}>
                    <input
                        id="surname"
                        name="surname"
                        placeholder="Apellidos"
                        type="text"
                        required
                    />
                </div>

                <div className={classes.inputGroup}>
                    <input
                        id="email"
                        name="email"
                        placeholder="Correo electrónico"
                        type="text"
                        required
                    />
                </div>

                <div className={classes.inputGroup}>
                    <input
                        id="address"
                        name="address"
                        placeholder="dierccion"
                        type="text"
                        required
                    />
                </div>

                <Button children="Actualizar datos" variant="large" color="azul"/>
            </div>

        </div>


    )
}

export default UserModal;