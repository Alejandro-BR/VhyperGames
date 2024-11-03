import styles from "./Team.module.css";
import TeamMember from "./TeamMember";

function Team() {
  const members = [
    { name: 'Alejandro Barrionuevo', role: 'Full Stack Developer', urlImage: '/img/ale.svg' },
    { name: 'Pablo Ruiz', role: 'Full Stack Developer', urlImage: '/img/pablo.svg' },
    { name: 'Raquel Lopez', role: 'Team Leader', urlImage: '/img/raquel.svg' },
    { name: 'José Molina', role: 'Backend Developer', urlImage: '/img/jose.svg' },
    { name: 'Fernando Jafet', role: 'Full Stack Developer', urlImage: '/img/fernando.svg' },
  ];

  return (
    <>
      <hr className={styles.hr} />
      <section className={styles.team}>
        <div className={styles.title}>
          <span className={styles.item}>❙</span>
          <h3>Equipo</h3>
        </div>
        <div className={styles.membersContainer}>
          {members.map((member) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              urlImage={member.urlImage}
            />
          ))};
        </div>
      </section>
      <hr className={styles.hr} />
    </>
  );
}

export default Team;
