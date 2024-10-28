import React, { useState } from 'react';
import styles from './Login.module.css';
import RegisterModal from './RegisterModal'; // Asegúrate de que la ruta sea correcta

function LoginRegister() {
    const [isOpen, setIsOpen] = useState(true);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const closeModal = () => setIsOpen(false);
    const openRegisterModal = () => {
        setIsOpen(false);          // Cerrar el modal de inicio
        setIsRegisterOpen(true);    // Abrir el modal de registro
    };
    const closeRegisterModal = () => setIsRegisterOpen(false);

    if (!isOpen && !isRegisterOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            {isOpen && (
                <div className={styles.loginModule}>
                    <button className={styles.logoCerrar} onClick={closeModal}>✖</button>

                    <div className={styles.imagenUser}>
                        <img src="./public/icon/user-grande-icon.svg" alt="Logo usuario" />
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type="button" className={`${styles.submitButton} ${styles.iniciarSesion}`}>
                            Iniciar sesión
                        </button>
                        <button 
                            type="button" 
                            className={`${styles.submitButton} ${styles.nuevoUsuario}`}
                            onClick={openRegisterModal} // Abrir el modal de registro
                        >
                            Nuevo Usuario
                        </button>
                    </div>
                </div>
            )}

            {/* Mostrar el modal de registro si isRegisterOpen es true */}
            {isRegisterOpen && <RegisterModal onClose={closeRegisterModal} />}
        </div>
    );
}

export default LoginRegister;
