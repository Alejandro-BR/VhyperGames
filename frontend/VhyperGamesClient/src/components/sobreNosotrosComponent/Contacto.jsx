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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509234!2d144.95373631511655!3d-37.81627957975199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f0bafc1%3A0x5045675218ceed0!2sC%2F%20Frederick%20Terman%2C%203%20%7C%20Google!5e0!3m2!1sen!2sus!4v1614027070742!5m2!1sen!2sus" 
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
