import { useRef, useState } from "react";
import Button from "../buttonComponent/Button";
import classes from "../loginComponents/Login.module.css";
import { jwtDecode } from "jwt-decode";
import { REGISTER_ENDPOINT } from "../../config";
import { validation } from "../../utils/validationForm.js";
import { updateSessionStorage } from "../../utils/keep.js"

function RegisterModal({ onClose }) {
  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const passwordRef1 = useRef();
  const passwordRef2 = useRef();
  const addressRef = useRef();
  const [emailError, setEmailError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const email = emailRef.current.value;
    const password1 = passwordRef1.current.value;
    const password2 = passwordRef2.current.value;
    const address = addressRef.current.value;

    if (!validation.isValidEmail(email)) {
      setEmailError("Email no válido.");
      return;
    }

    if (!validation.isValidPassword(password1)) {
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

    // Verificar si las contraseñas coinciden
    if (password1 !== password2) {
      setPasswordError("Las contraseñas no coinciden.");
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
      address,
    };

    // Llamar a la función fetchingData
    await fetchingData(REGISTER_ENDPOINT, data);
  };

  async function fetchingData(url, data) {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const datosPromesa = await response.json();
        const token = datosPromesa.accessToken;
        console.log("Token recibido:", token);

        //Decodificar el código
        const decodedToken = jwtDecode(token);

        if (decodedToken) {
          const userInfo = {
            id: decodedToken.id,
            role: decodedToken.role,
            name: decodedToken.name,
          };
          
          updateSessionStorage(token, "accessToken");
          
        }
        onClose();

        setTimeout(() => {
          alert(`Bienvenido, ${decodedToken.name}`);
        }, 500);
      } else if (response.status === 400) {
        setEmailError("Email en uso.");
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error en el registro:", error);
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
          {errorMessage && <div className={classes.error}>{errorMessage}</div>}
          {passwordError && (
            <div className={classes.error}>{passwordError}</div>
          )}
          {emailError && <div className={classes.error}>{emailError}</div>}

          <div className={classes.inputGroup}>
            <input
              id="nombre"
              name="nombre"
              ref={nameRef}
              placeholder="Nombre"
              type="text"
              required
            />
          </div>

          <div className={classes.inputGroup}>
            <input
              id="surname"
              name="surname"
              ref={surnameRef}
              placeholder="Apellidos"
              type="text"
              required
            />
          </div>

          <div className={classes.inputGroup}>
            <input
              id="email"
              name="email"
              ref={emailRef}
              placeholder="Correo electrónico"
              type="text"
              required
            />
          </div>

          <div className={classes.inputGroup}>
            <input
              id="password1"
              name="password1"
              ref={passwordRef1}
              placeholder="Contraseña"
              type="password"
              required
            />
          </div>

          <div className={classes.inputGroup}>
            <input
              id="password2"
              name="password2"
              ref={passwordRef2}
              placeholder="Confirmar contraseña"
              type="password"
              required
            />
          </div>

          <div className={classes.inputGroup}>
            <input
              id="address"
              name="address"
              ref={addressRef}
              placeholder="Dirección"
              type="text"
              required
            />
          </div>
          <Button
            type="submit"
            variant="large"
            color="morado-azul"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Registrase"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
