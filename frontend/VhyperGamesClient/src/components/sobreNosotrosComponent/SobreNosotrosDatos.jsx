import styles from "./SobreNosotrosDatos.module.css";

function SobreNosotrosDatos() {
  return (
    <section className={styles.container}>
      <h2>Sobre Nosotros</h2>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img src="/img/Foto-oficina.svg" alt="office" />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.text}>
            <img src="/icon/icono-nave.svg" alt="Misión Empresarial" className={styles.iconoShip} />
            <div>
              <h3 className={styles.title}>Misión Empresarial</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit ametconsectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscingconsectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscingconsectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
            </div>
          </div>
          <div className={styles.text}>
            <img src="/icon/icono-nave.svg" alt="Visión" className={styles.iconoShip} />
            <div>
              <h3 className={styles.title}>Visión</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elitctetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elitctetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elitctetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elitsctetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className={styles.text}>
            <img src="/icon/icono-nave.svg" alt="Valores" className={styles.iconoShip} />
            <div>
              <h3 className={styles.title}>Valores</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscingconsectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscingconsectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscingconsectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreNosotrosDatos;
