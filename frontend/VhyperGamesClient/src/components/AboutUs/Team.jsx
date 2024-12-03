import classes from "./Team.module.css";
import TeamMember from "./TeamMember";

function Team() {
  const members = [
    { name: 'Alejandro Barrionuevo', role: 'Full Stack Developer', urlImage: '/img/ale.svg' },
    { name: 'Pablo Ruiz', role: 'Full Stack Developer', urlImage: '/img/pablo.svg' },
    { name: 'Raquel López', role: 'Team Leader', urlImage: '/img/raquel.svg' },
    { name: 'José Molina', role: 'Backend Developer', urlImage: '/img/jose.svg' },
    { name: 'Fernando Sánchez', role: 'Full Stack Developer', urlImage: '/img/fernando.svg' },
  ];

  return (
    <>
      <hr className={classes.hr} />
      <section className={classes.team}>
        <div className={classes.title}>
          <span className={classes.item}>❙</span>
          <h3>Equipo</h3>
        </div>
        <div className={classes.membersContainer}>
          {members.map((member) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              urlImage={member.urlImage}
            />
          ))}
        </div>
      </section>
      <hr className={classes.hr} />
    </>
  );
}

export default Team;
