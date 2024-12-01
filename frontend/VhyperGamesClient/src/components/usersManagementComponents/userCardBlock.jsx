import UserCard from "./userCard";

function UserCardBlock() {

    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${GET_USERS}`);
            if (!response.ok) {
                throw new Error("Ha habido un error al obtener los usuarios.");
            }
            const data = await response.json();

            setUsers(Array.isArray(data.users) ? data.users : []);; // Esto habrá que modificarlo. No creo que sea users (?)

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchUsers; // No estoy seguro de que se utilice así

    return (
        <section>
            {users.map((user) => (
                <UserCard name={user.name + " " + user.surname} email={user.email} rol={user.rol} />
            ))}
        </section>
    );

}

export default UserCardBlock