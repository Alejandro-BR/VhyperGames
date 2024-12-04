import { useContext } from "react";
import UserCard from "./UserCard";
import classes from "./UserCardBlock.module.css";
import { AdminContext } from "../../context/AdminContext"
import { useEffect } from "react";
import { useAuth } from "../../context/authcontext";

function UserCardBlock() {

  const { users, fetchUsers } = useContext(AdminContext);
  const { token, decodedToken } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className={classes.productsList}>
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          rol={user.rol}
        />
      ))}
    </section>
  );

}

export default UserCardBlock