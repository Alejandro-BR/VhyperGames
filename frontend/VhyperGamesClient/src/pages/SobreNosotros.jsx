// import React from 'react';
import styles from "../components/sobreNosotrosComponent/SobreNosotros.module.css";
import Header from "../components/headerComponent/Header";
import Team from "../components/sobreNosotrosComponent/Team";
import Footer from "../components/footerComponent/Footer";

//Sin implementar por ahora
// const teamMembers = [
//   { name: 'Alejandro Barrionuevo', role: 'Minecraft CEO', img: '/img/ale.svg' },
//   { name: 'Pablo Ruiz', role: 'Full Stack Developer', img: '/img/pablo.svg' },
//   { name: 'Raquel Lopez', role: 'Team Leader', img: '/img/raquel.svg' },
//   { name: 'José Molina', role: 'Backend Developer', img: '/img/jose.svg' },
//   { name: 'Fernando Jafet', role: 'Full Stack Developer', img: '/img/fernando.svg' },
// ];
//Sin implementar por ahora

function SobreNosotros() {
  return (
    <>
      <Header />

      <div className={styles.page}>
        <h2>Sobre Nosotros</h2>
        <div className={styles.container}>
          {/* Sobre Nosotros - empresa */}
          <div className="imagen">
            <img src="/img/Foto-oficina.svg" alt="office" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.text}>
              <img
                src="/icon/icono-nave.svg"
                alt="Descripción del icono"
                className={styles.iconoShip}
              />
              <h3 className={styles.title}>Misión Empresarial</h3>
              <p>
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit dolor sit amet
                Lorem ipsum dolor sitdolor sit amet Lorem ipsum dolor sitdolor
                sit amet Lorem ipsum dolor sitdolor sit amet Lorem ipsum dolor
                sitdolor sit amet Lorem ipsum dolor sitdolor sit amet Lorem
                ipsum dolor sitdolor sit amet Lorem ipsum dolor sitametLorem
                ipsum dolor sit ametLorem ipsum dolor sit amet
              </p>
            </div>
            <div className={styles.text}>
              <img
                src="/icon/icono-nave.svg"
                alt="Descripción del icono"
                className={styles.iconoShip}
              />
              <h3 className={styles.title}>Visión</h3>
              <p>
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit dolor sit amet
                Lorem ipsum dolor sitdolor sit amet Lorem ipsum dolor sitdolor
                sit amet Lorem ipsum dolor sitdolor sit amet Lorem ipsum dolor
                sitdolor sit amet Lorem ipsum dolor sitdolor sit amet Lorem
                ipsum dolor sitdolor sit amet Lorem ipsum dolor sitametLorem
                ipsum dolor sit ametLorem ipsum dolor sit amet
              </p>
            </div>
            <div className={styles.text}>
              <img
                src="/icon/icono-nave.svg"
                alt="Descripción del icono"
                className={styles.iconoShip}
              />
              <h3 className={styles.title}>Valores</h3>
              <p>
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit dolor sit amet
                Lorem ipsum dolor sitdolor sit amet Lorem ipsum dolor sitdolor
                sit amet Lorem ipsum dolor sitdolor sit amet Lorem ipsum dolor
                sitdolor sit amet Lorem ipsum dolor sitdolor sit amet Lorem
                ipsum dolor sitdolor sit amet Lorem ipsum dolor sitametLorem
                ipsum dolor sit ametLorem ipsum dolor sit amet
              </p>
            </div>
          </div>
        </div>{" "}
        {/* Fin sobre nosotros-empresa */}

        {/* <div className="horizontal-bar">-------</div> */}


        {/*Equipo cards */}
        <Team />
        {/*Fin equipo cards*/}

        <div className="text-team">
          <span className="vertical-bar">|</span>
          <h3>¿Dónde estamos?</h3>
        </div>
        <div className="contact-location">
          <div className="contact">
            <p>
              <img src="/icon/telefono-icon.svg" alt="icon-phone" />
              600 00 00 00
            </p>
            <p>
              <img src="/icon/email-icon.svg" alt="icon-email" />
              Vhypergames@gmail.com
            </p>
            <p>
              <img src="/icon/ubicacion-icon.svg" alt="icon-location" />
              C/ Frederick Terman, 3
            </p>
          </div>

          <div className="location">
            <img src="/img/mapa.svg"></img>
            {/*<Mapa />  IMPLEMENTAR MAPA GOOGLE CON API MIENTRAS TANTO FOTO SIMULANDO*/}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SobreNosotros;
