import React, { useState } from 'react';
import styles from './Login.module.css';

function LoginRegister() {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => setIsOpen(false);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.loginModule}>
                <button className={styles.logoCerrar} onClick={closeModal}>✖</button>

                <div className={styles.imagenUser}>
                    <img src="./public/icon/user-grande-icon.svg" alt="Logo usuario" />
                </div>

                {/* Aquí solo mostramos los botones de inicio y registro */}
                <div className={styles.buttonContainer}>
                    <button type="button" className={`${styles.submitButton} ${styles.iniciarSesion}`}>
                        Iniciar sesión
                    </button>
                    <button type="button" className={`${styles.submitButton} ${styles.nuevoUsuario}`}>
                        Nuevo Usuario
                    </button>
                </div>

            </div>
        </div>
    );
}

export default LoginRegister;
