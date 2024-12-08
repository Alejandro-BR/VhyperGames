import classes from "./UserCard.module.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useState, useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";
import Button from "../../Buttons/Button"

function UserCard({ id, name, email, rol }) {
  const { fetchUsers, updateUserRole, deleteUserById } = useContext(AdminContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await deleteUserById(id);
      setDeleteModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error.message);
    }
  };

  return (
    <>
      <article className={classes.card}>
        <img src="/icon/user_header.svg" alt={name} className={classes.userImg} />

        <div className={`${classes.container} ${classes.userContainer}`}>
          <h2 className={classes.containerTitle}>Usuario</h2>
          <p className={classes.user}>{name}</p>
        </div>

        <div className={`${classes.container} ${classes.emailContainer}`}>
          <h2 className={classes.containerTitle}>Email</h2>
          <p className={classes.email}>{email}</p>
        </div>

        <div className={`${classes.container} ${classes.roleContainer}`}>
          <h2 className={classes.containerTitle}>Rol</h2>
          <p className={classes.role}>{rol}</p>
        </div>

        <div className={classes.buttonContainer}>
          <Button
            variant={"medium"}
            color={"azul"}
            onClick={() => updateUserRole(id)}
          >
            Editar <br />
            usuario
          </Button>
          <button className={classes.deleteUser} onClick={() => setDeleteModal(true)}>
            <img src="/icon/icono-bin.svg" alt="eliminar usuario" />
          </button>
        </div>
      </article>

      {deleteModal && (
        <DeleteModal
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDeleteUser}
        />
      )}
    </>
  );
}

export default UserCard;
