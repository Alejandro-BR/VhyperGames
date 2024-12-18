import { useRef, useState } from 'react';
import classes from './Login.module.css';
import Button from '../Buttons/Button';
import RegisterModal from '../Register/RegisterModal';
import { LOGIN_ENDPOINT } from '../../config';
import { useAuth } from '../../context/AuthContext';

function LoginModal({ onClose, onRegisterClick, onSuccess }) {
    const { saveToken } = useAuth();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [promesaError, setPromesaError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mostrarRegister, setMostrarRegister] = useState(false);
    const [rememberSession, setRememberSession] = useState(false);



    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;

        const objetoBackend = {
            email: emailValue,
            password: passwordValue,
        };

        await fetchingData(LOGIN_ENDPOINT, objetoBackend);
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
                
                saveToken(token, rememberSession);

                if (onSuccess) {
                    onSuccess(); 
                }

                onClose();

            } else if (response.status === 401) {
                setPromesaError("Email o contraseña inválidos");
            }
        } catch (error) {
            setPromesaError(`${error.message}`);

        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className={classes.modalOverlay}>
            <div className={classes.loginModule}>
                <button className={classes.logoCerrar} onClick={onClose}>
                    <img src="/icon/cerrar-icon.svg" alt="icono cerrar" />
                </button>

                <div className={classes.imagenUser}>
                    <img src="/icon/user-grande-icon.svg" alt="Logo usuario" />
                </div>

                <form className={classes.formContainer} onSubmit={handleSubmit}>


                    <div className={classes.inputGroup}>
                        <input
                            id="email"
                            name="email"
                            ref={emailRef}
                            placeholder="Correo electrónico"
                            type="email"
                            required
                        />
                    </div>

                    <div className={classes.inputGroup}>
                        <input
                            id="password"
                            name="password"
                            ref={passwordRef}
                            placeholder="Contraseña"
                            type="password"
                            required
                        />
                    </div>

                    <div className={`${classes.rememberMe} ${classes.rememberGroup}`}>
                        <input 
                            type="checkbox" 
                            id="rememberMe" 
                            checked={rememberSession}
                            onChange={() => setRememberSession(!rememberSession)}/>
                        <label htmlFor="rememberMe">Recuérdame</label>
                        
                    </div>

                    {promesaError && <div className={classes.error}>{promesaError}</div>}

                    <div className={classes.buttonContainer}>
                        <Button type="submit" variant='large' color='morado' disabled={isLoading}>
                            {isLoading ? "Cargando..." : "Iniciar Sesión"}
                        </Button>

                        <Button variant="large" color="azul" onClick={() => {
                            onRegisterClick();
                            onClose();
                        }}>
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