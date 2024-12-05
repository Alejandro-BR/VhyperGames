import classes from "./UserModal.module.css"
import Button from "../Buttons/Button";

function UserModal({ onClose }, name, surname, email, address) {
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.userModal}>

                <div className={classes.inputGroup}>
                    <p>Nombre:</p>
                    <input
                        id="nombre"
                        name="nombre"
                        defaultValue={name}
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

                <div className={classes.buttons}>
                    <Button children="Actualizar datos" variant="large" color="azul" />
                    <Button children="Cancelar" variant="large" color="morado" onClick={onClose} />
                </div>

            </div>

        </div>


    )
}

export default UserModal;