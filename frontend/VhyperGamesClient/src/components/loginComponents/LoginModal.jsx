import { useRef, useState } from 'react';
import styles from './Login.module.css';
import Button from '../buttonComponent/Button';
import RegisterModal from '../registerComponents/RegisterModal';
import { jwtDecode } from 'jwt-decode';


function LoginModal({ onClose, onRegisterClick }) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [promesaError, setPromesaError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mostrarRegister, setMostrarRegister] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;

        const objetoBackend = {
            email: emailValue,
            password: passwordValue,
        };

        await fetchingData('https://localhost:7207/api/auth/login', objetoBackend);
    };

    async function fetchingData(url, data) {
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const datosPromesa = await response.json();
                const token = datosPromesa.accessToken;
                console.log('Token recibido:', token)

                //Decodificar el código
                const decodedToken = jwtDecode(token);

                if (decodedToken) {
                    const userInfo = {
                        id: decodedToken.id,
                        role: decodedToken.role,
                        name: decodedToken.name
                    };
                    console.log("userInfo", userInfo);

                }
                onClose();

                setTimeout(() => {
                    alert(`Bienvenido, ${decodedToken.name}`);
                }, 500);

            } else if (response.status === 401) {
                setPromesaError("Email o contraseña inválidos");
            }
        } catch (error) {
            console.log(error);
            setPromesaError(`${error.message}`);

        } finally {
            setIsLoading(false);
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
                            id="password"
                            name="password"
                            ref={passwordRef}
                            placeholder="Contraseña"
                            type="password"
                            required
                        />
                    </div>

                    <div className={`${styles.rememberMe} ${styles.rememberGroup}`}>
                        <input type="checkbox" id="rememberMe" />
                        <label htmlFor="rememberMe">Recuérdame</label>
                    </div>

                    {promesaError && <div className={styles.error}>{promesaError}</div>}

                    <div className={styles.buttonContainer}>
                        <Button type="submit" variant='large' color='morado' disabled={isLoading}>
                            {isLoading ? "Cargando..." : "Iniciar Sesión"}
                        </Button>

                        <Button variant="large" color="azul" onClick={onRegisterClick}>
                            Nuevo Usuario
                        </Button>
                    </div>
                </form>
                {mostrarRegister && <RegisterModal onClose={() => setMostrarRegister(false)} />}
            </div>
        </div>
    );
}

export default LoginModal;