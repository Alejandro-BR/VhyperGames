import styles from "./TeamMember.module.css";

function TeamMember({name, role, urlImage}) {
  return (
    <div className={styles.cardMember}>
    <img className={styles.cardImage} src={urlImage} alt="photo-developer" />
    <p className={styles.cardText}>{name}</p>
    <p className={styles.cardText}>{role}</p>
  </div>
  );
}
export default TeamMember;