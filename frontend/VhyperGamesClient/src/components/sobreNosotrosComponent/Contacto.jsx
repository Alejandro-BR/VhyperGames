import classes from "./Contacto.module.css";

function Contacto() {
  return (
    <div className={classes.container}>
      <div className={classes.contact}>
        <div className={classes.data}>
          <span className={classes.item}>|</span>
          <h3>Contacto</h3>
        </div>
        <div className={classes.box}>
          <div className={classes.boxData}>
            <img src="/icon/telefono-icon.svg" alt="icon-phone" />
            <p>
              600 00 00 00
            </p>
          </div>
          <div className={classes.boxData}>
            <img src="/icon/email-icon.svg" alt="icon-email" />
            <p>
              vhypergames@gmail.com
            </p>
          </div>
          <div className={classes.boxData}>
            <img src="/icon/ubicacion-icon.svg" alt="icon-location" />
            <p>
              C/ Frederick Terman, 3
            </p>
          </div>
        </div>
      </div>

      <div className={classes.whoAreWe}>
        <div className={classes.dataMap}>
          <span className={classes.item}>|</span>
          <h3>¿Quiénes somos?</h3>
        </div>
        <div className={classes.location}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25582.218531475766!2d-4.55213745!3d36.727909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f02ca2c5b6a9%3A0x50f43244f6e8bb5!2sCESUR%20M%C3%A1laga%20PTA%20Formaci%C3%B3n%20Profesional!5e0!3m2!1ses!2ses!4v1730742795149!5m2!1ses!2ses"
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
