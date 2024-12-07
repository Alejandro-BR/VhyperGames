import classes from "./UserCard.module.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useState, useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";

function UserCard({ id, name, email, rol }) {
  const { fetchUsers, updateUserRole, deleteUserById } = useContext(AdminContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const Icon = ({ onClick }) => (
    <svg
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      <g clipPath="url(#clip0_17_822)">
        <path
          d="M10 17.25C7.5 17.25 5.25 16 4 14C4 12 8 10.875 10 10.875C12 10.875 16 12 16 14C14.75 15.875 12.5 17.25 10 17.25ZM10 3C11.625 3 13 4.375 13 6C13 7.625 11.625 9 10 9C8.375 9 7 7.625 7 6C7 4.375 8.375 3 10 3ZM10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_17_822">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

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

        <div className={classes.container}>
          <h2 className={classes.containerTitle}>Usuario</h2>
          <p className={classes.user}>{name}</p>
        </div>

        <div className={classes.container}>
          <h2 className={classes.containerTitle}>Email</h2>
          <p className={classes.email}>{email}</p>
        </div>

        <div className={classes.container}>
          <h2 className={classes.containerTitle}>Rol</h2>
          <p className={classes.rol}>{rol}</p>
        </div>

        <div className={classes.buttonContainer}>
          <button className={classes.editUser}>
            <Icon onClick={() => updateUserRole(id)} />
          </button>
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
