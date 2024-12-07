
import { useRef, useState } from "react";
import classes from "./UserModal.module.css";
import Button from "../Buttons/Button";
import { updatePassword } from "../../endpoints/UserEndpoints";
import { useAuth } from "../../context/AuthContext";
import { UPDATE_PASSWORD } from "../../config";

function PasswordModal({ onClose }) {
  const { token } = useAuth(); 
  const passwordRef = useRef(null); 
  const passwordConfirmRef = useRef(null); 
  const [promesaError, setPromesaError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordValue = passwordRef.current.value;
    const passwordConfirmValue = passwordConfirmRef.current.value;

    if (passwordValue !== passwordConfirmValue) {
      setPromesaError("Las contraseñas no coinciden");
      return;
    }

    try {
      setIsLoading(true);
      await updatePassword(UPDATE_PASSWORD, passwordValue, token);
      onClose(); 
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setPromesaError("Error al actualizar la contraseña");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.userModal}>

        <form className={classes.formContainer} onSubmit={handleSubmit}>
          <div className={classes.inputGroup}>
            <p>Contraseña:</p>
            <input
              id="password"
              name="password"
              ref={passwordRef}
              placeholder="Contraseña"
              type="password"
              required
            />
          </div>

          <div className={classes.inputGroup}>
            <p>Confirmar Contraseña:</p>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              ref={passwordConfirmRef}
              placeholder="Confirme la contraseña"
              type="password"
              required
            />
          </div>

          {promesaError && <div className={classes.error}>{promesaError}</div>}

          <div className={classes.buttons}>
            <Button
              type="button"
              variant="large"
              color="morado"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="large"
              color="azul"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Aceptar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordModal;
