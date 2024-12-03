import classes from "./UserModal.module.css"
import Button from "../buttonComponent/Button";

function UserModal({ onClose }) {
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.userModal}>

                <div className={classes.inputGroup}>
                    <p>Nombre:</p>
                    <input
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre"
                        type="text"
                        required
                    />
                </div>

                <div className={classes.inputGroup}>
                    <p>Apellidos:</p>
                    <input
                        id="surname"
                        name="surname"
                        placeholder="Apellidos"
                        type="text"
                        required
                    />
                </div>

                <div className={classes.inputGroup}>
                    <p>Correo electronico:</p>
                    <input
                        id="email"
                        name="email"
                        placeholder="Correo electrónico"
                        type="text"
                        required
                    />
                </div>

                <div className={classes.inputGroup}>
                    <p>Direccion:</p>
                    <input
                        id="address"
                        name="address"
                        placeholder="Dierccion"
                        type="text"
                        required
                    />
                </div>

                <div className={classes.inputGroup}>
                    <p>Contraseña:</p>
                    <input
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        type="password"
                        required
                    />
                </div>

                <div className={classes.inputGroup}>
                    <p>confirmar Contraseña:</p>
                    <input
                        id="passwordConfirm"
                        name="passworConfirm"
                        placeholder="Confirme la contraseña"
                        type="password"
                        required
                    />
                </div>

                <div className={classes.buttons}>
                    <Button children="Actualizar datos" variant="large" color="azul" />
                    <Button children="Cancelar" variant="large" color="morado" onClick={onClose} />
                </div>

            </div>

        </div>


    )
}

export default UserModal;