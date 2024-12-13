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
              vhypergames24@gmail.com
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
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.250350392296!2d-4.557037723622077!3d36.74056147105814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f10963ce0f3d%3A0x310ae7d4bb2e8f7b!2sCPIFP%20Alan%20Turing!5e0!3m2!1ses!2ses!4v1734105991655!5m2!1ses!2ses" 
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
