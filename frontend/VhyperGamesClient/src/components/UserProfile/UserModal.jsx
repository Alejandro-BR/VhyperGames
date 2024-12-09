import classes from "./UserModal.module.css"
import Button from "../Buttons/Button";
import { updateUser } from "../../endpoints/UserEndpoints";
import { UPDATE_USER } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { useRef } from "react";


function UserModal({ onClose, userInfo }) {
    const { token } = useAuth();
    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        const email = emailRef.current.value;
        const address = addressRef.current.value;

        const userData = {
            name: name,
            surname: surname,
            email: email,
            address: address,
        };

        try {
            await updateUser(UPDATE_USER, userData, token)
            onClose();
        } catch (error) {
            console.error("Error al actualizar los datos de usuario:", error);
        }
    };

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.userModal}>

                <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.inputGroup}>
                        <p>Nombre:</p>
                        <input
                            id="nombre"
                            name="nombre"
                            defaultValue={userInfo.name}
                            type="text"
                            required
                            ref={nameRef}
                        />
                    </div>

                    <div className={classes.inputGroup}>
                        <p>Apellidos:</p>
                        <input
                            id="surname"
                            name="surname"
                            defaultValue={userInfo.surname}
                            type="text"
                            required
                            ref={surnameRef}
                        />
                    </div>

                    <div className={classes.inputGroup}>
                        <p>Correo electronico:</p>
                        <input
                            id="email"
                            name="email"
                            defaultValue={userInfo.email}
                            type="text"
                            required
                            ref={emailRef}
                        />
                    </div>

                    <div className={classes.inputGroup}>
                        <p>Direccion:</p>
                        <input
                            id="address"
                            name="address"
                            defaultValue={userInfo.address}
                            type="text"
                            required
                            ref={addressRef}
                        />
                    </div>

                    <div className={classes.buttons}>

                        <Button children="Cancelar" variant="large" color="morado" onClick={onClose} />
                        <Button children="Actualizar datos" variant="large" color="azul" type="submit" />
                    </div>
                </form>


            </div>

        </div>


    )
}

export default UserModal;