
import { useRef, useState } from "react";
import classes from "./UserModal.module.css";
import Button from "../Buttons/Button";
import { updatePassword } from "../../endpoints/UserEndpoints";
import { useAuth } from "../../context/AuthContext";
import { UPDATE_PASSWORD } from "../../config";
import { validation } from "../../utils/validationForm";

function PasswordModal({ onClose }) {
  const { token } = useAuth();
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [promesaError, setPromesaError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordValue = passwordRef.current.value;
    const passwordConfirmValue = passwordConfirmRef.current.value;

    if (passwordValue !== passwordConfirmValue) {
      setPromesaError("Las contraseñas no coinciden");
      return;
    }

    if (!validation.isValidPassword(passwordValue)) {
      setPasswordError(
        <div>
          <p style={{ fontWeight: "bold", color: "#a440d2" }}>
            La contraseña debe incluir:
          </p>
          <ul style={{ paddingLeft: "20px" }}>
            <li style={{ color: "#a440d2" }}>Al menos 8 caracteres.</li>
            <li style={{ color: "#a440d2" }}>Al menos una letra mayúscula.</li>
            <li style={{ color: "#a440d2" }}>Al menos una letra minúscula.</li>
            <li style={{ color: "#a440d2" }}>Al menos un número.</li>
            <li style={{ color: "#a440d2" }}>
              Al menos un carácter especial (@, \, /, =, etc).
            </li>
          </ul>
        </div>
      );
      return;
    }

    try {
      setIsLoading(true);
      await updatePassword(UPDATE_PASSWORD, passwordValue, token);
      onClose();
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setPromesaError("Error al actualizar la contraseña");
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.userModal}>

        <form className={classes.form} onSubmit={handleSubmit} >

          {errorMessage && <div className={classes.error}>{errorMessage}</div>}
          {passwordError && (
            <div className={classes.error}>{passwordError}</div>
          )}
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
