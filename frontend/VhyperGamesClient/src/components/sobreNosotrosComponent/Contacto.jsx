import styles from "./Contacto.module.css";

function Contacto() {
  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <div className={styles.data}>
          <span className={styles.item}>|</span>
          <h3>Contacto</h3>
        </div>
        <div className={styles.box}>
          <p>
            <img src="/icon/telefono-icon.svg" alt="icon-phone" /> 600 00 00 00
          </p>
          <p>
            <img src="/icon/email-icon.svg" alt="icon-email" /> Vhypergames@gmail.com
          </p>
          <p>
            <img src="/icon/ubicacion-icon.svg" alt="icon-location" /> C/ Frederick Terman, 3
          </p>
        </div>
      </div>

      <div className={styles.whoAreWe}>
        <div className={styles.data}>
          <span className={styles.item}>|</span>
          <h3>¿Quiénes somos?</h3>
        </div>
        <div className={styles.location}>
          <iframe
            src={`https://www.google.com/maps/embed/v1/view?key=TU_CLAVE_API&center=36.74059156245471,-4.554462802812171&zoom=14`}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy">
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
