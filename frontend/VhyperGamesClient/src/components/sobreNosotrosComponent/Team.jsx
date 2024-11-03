import classes from "./Team.module.css";

function Team() {
  return (
    <>
      <hr className={classes.hr} />

      <div className={classes.title}>
        <h3 className={classes.palito}>❙</h3>
        <h3>Equipo</h3>
      </div>

      <section className={classes.team}>
        <div className="card">
          <img src="/img/ale.svg" alt="photo-user" />
          <p>Alejandro Barrionuevo</p>
          <p>Minecraft CEO</p>
        </div>

        <div className="card">
          <img src="/img/pablo.svg" alt="photo-user" />
          <p>Pablo Ruiz</p>
          <p>Full Stack Developer</p>
        </div>

        <div className="card">
          <img src="/img/raquel.svg" alt="photo-user" />
          <p>Raquel Lopez</p>
          <p>Team Leaders</p>
        </div>

        <div className="card">
          <img src="/img/jose.svg" alt="photo-user" />
          <p>José Molina</p>
          <p>Backend Developer</p>
        </div>

        <div className="card">
          <img src="/img/fernando.svg" alt="photo-user" />
          <p>Fernando Jafet</p>
          <p>Full Stack Developer</p>
        </div>
      </section>

      <hr className={classes.hr} />
    </>
  );
}

export default Team;
