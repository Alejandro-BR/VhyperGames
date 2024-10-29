import { useRef, useState } from 'react';
import Button from '../buttonComponent/Button'
import styles from '../loginComponents/Login.module.css';
//import { decode as jwt_decode } from 'jwt-decode';


function RegisterModal({ onClose }) {
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef1 = useRef();
    const passwordRef2 = useRef();
    const addressRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        const email = emailRef.current.value;
        const password1 = passwordRef1.current.value;
        const password2 = passwordRef2.current.value;
        const address = addressRef.current.value;

        // Verificar si las contraseñas coinciden
        if (password1 !== password2) {
            setPasswordError("Las contraseñas introducidas no coinciden.");
            return; 
        } else {
            setPasswordError(""); 
        }

        // Crear objeto de datos
        const data = { 
            name, 
            surname, 
            email, 
            password: password1, 
            address 
        };

        // Llamar a la función fetchingData
        await fetchingData('https://localhost:7207/api/auth/register', data);
    };

    async function fetchingData(url, data) {
        try {
            const response = await fetch(url, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Obtener el texto de error
                throw new Error(errorText || "Error al registrarse.");
            }

            const responseData = await response.json();
            const { accessToken } = responseData;
            localStorage.setItem('accessToken', accessToken);

            // Aquí podrías decodificar el token si es necesario
            // const decodedToken = jwt_decode(accessToken);
            // console.log(decodedToken);

            onClose(); // Cerrar modal después del registro exitoso
            window.location.href = 'http://localhost:5173/';

        } catch (error) {
            setErrorMessage(error.message);
            console.error('Error en el registro:', error);
        }
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.loginModule}>
            <button className={styles.logoCerrar} onClick={onClose}>
                    <img src="./public/icon/cerrar-icon.svg" alt="icono cerrar" />
                </button>

                <div className={styles.imagenUser}>
                    <img src="./public/icon/user-grande-icon.svg" alt="Logo usuario" />
                </div>

                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                    {passwordError && <div className={styles.error}>{passwordError}</div>}

                    <div className={styles.inputGroup}>
                        <input 
                            id="nombre"
                            name="nombre"
                            ref={nameRef}
                            placeholder="Nombre"
                            type="text"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input 
                            id="surname"
                            name="surname"
                            ref={surnameRef}
                            placeholder="Apellidos"
                            type="text"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input 
                            id="email"
                            name="email"
                            ref={emailRef}
                            placeholder="Correo electrónico"
                            type="email"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input 
                            id="password1"
                            name="password1"
                            ref={passwordRef1}
                            placeholder="Contraseña"
                            type="password"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input 
                            id="password2"
                            name="password2"
                            ref={passwordRef2}
                            placeholder="Confirmar contraseña"
                            type="password"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input 
                            id="address"
                            name="address"
                            ref={addressRef}
                            placeholder="Dirección"
                            type="text"
                            required
                        />
                    </div>
                    <Button type="submit" variant='large' color='morado-azul'>
                        Registrarse
                    </Button>

                </form>
            </div>
        </div>
    );
}

export default RegisterModal;
