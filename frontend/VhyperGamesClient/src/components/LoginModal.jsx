import React, { useRef, useState } from 'react';
import styles from './Login.module.css';

function LoginModal() {
    const [isOpen, setIsOpen] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log({ email, password });
    };

    const closeModal = () => setIsOpen(false);

    if(!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.loginModule}>
                <button className={styles.logoCerrar} onClick={(closeModal)}>✖</button>

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
