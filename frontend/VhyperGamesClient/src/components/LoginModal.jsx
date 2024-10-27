import React, { useRef, useState } from 'react';
import styles from './Login.module.css';

function LoginModal() {
    const [isOpen, setIsOpen] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const response = await fetch('https://localhost:7207/api/auth/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                // Si la respuesta no es 2, lanza un error
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al iniciar sesión.");
            }

            // Si la respuesta es exitosa, procesa el resultado
            const data = await response.json();
            const { accessToken } = data; // Asume que el token está en esta estructura
            console.log('Inicio de sesión exitoso:', accessToken);
            // Aquí puedes guardar el token en el localStorage o context para su uso posterior
            localStorage.setItem('accessToken', accessToken);

            // Puedes cerrar el modal o redirigir a otra página aquí
            closeModal();

        } catch (error) {
            // Manejo de errores
            setErrorMessage(error.message); // Mostrar mensaje de error
            console.error('Error en el login:', error);
        }
    };

    const closeModal = () => setIsOpen(false);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.loginModule}>
                <button className={styles.logoCerrar} onClick={closeModal}>✖</button>

                <div className={styles.imagenUser}>
                    <img src="./public/icon/user-grande-icon.svg" alt="Logo usuario" />
                </div>

                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    {errorMessage && <div className={styles.error}>{errorMessage}</div>} {/* Mostrar mensaje de error */}

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

                    <div className={styles.rememberMe}>
                        <input type="checkbox" id="rememberMe" />
                        <label htmlFor="rememberMe">Recuérdame</label>
                    </div>

                    <button type="submit" className={`${styles.submitButton} ${styles.iniciarSesion}`}>Iniciar sesión</button>
                    <button type="button" className={`${styles.submitButton} ${styles.nuevoUsuario}`}>Nuevo Usuario</button>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;
