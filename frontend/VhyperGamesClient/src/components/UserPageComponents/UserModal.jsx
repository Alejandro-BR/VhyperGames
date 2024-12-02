import classes from "./UserModal.module.css"
import Button from "../buttonComponent/Button";

function UserModal({ onClose }) {
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.userModal}>

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

                <div className={classes.inputGroup}>
                    <input
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        type="text"
                        required
                    />
                </div>

                <div className={classes.inputGroup}>
                    <input
                        id="passwordConfirm"
                        name="passworConfirm"
                        placeholder="Confirme la contraseña"
                        type="text"
                        required
                    />
                </div>

                <Button children="Actualizar datos" variant="large" color="azul"/>
                <Button children="Cancelar" variant="large" color="morado" onClick={onClose}/>
            </div>

        </div>


    )
}

export default UserModal;