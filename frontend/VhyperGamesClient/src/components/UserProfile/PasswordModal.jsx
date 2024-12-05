import classes from "./UserModal.module.css"
import Button from "../Buttons/Button";

function PasswordModal({ onClose }) {
  return (
    <div className={classes.modalOverlay}>
      <div className={classes.userModal}>
        <div className={classes.inputGroup}>
          <p>Contraseña:</p>
          <input
            id="password"
            name="password"
            placeholder="Contraseña"
            type="password"
            required
          />
        </div>

        <div className={classes.inputGroup}>
          <p>Confirmar Contraseña:</p>
          <input
            id="passwordConfirm"
            name="passworConfirm"
            placeholder="Confirme la contraseña"
            type="password"
            required
          />
        </div>

        <div className={classes.buttons}>
          <Button children="Cancelar" variant="large" color="morado" onClick={onClose} />
          <Button children="Aceptar" variant="large" color="azul" />

        </div>

      </div>

    </div>


  )
}

export default PasswordModal;