import classes from "./TeamMember.module.css";

function TeamMember({name, role, urlImage}) {
  return (
    <div className={classes.cardMember}>
    <img className={classes.cardImage} src={urlImage} alt="photo-developer" />
    <p className={classes.cardText}>{name}</p>
    <p className={classes.cardText}>{role}</p>
  </div>
  );
}
export default TeamMember;