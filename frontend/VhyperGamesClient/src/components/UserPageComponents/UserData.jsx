import { useEffect, useState } from "react";
import { GET_USER } from "../../config";
import classes from "./UserData.module.css"
import { useAuth } from "../../context/authcontext";

function UserData({ }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const { token } = useAuth();


    useEffect(() => {

        const fetchUsers = async () => {

            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${GET_USER}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    });

                if (!response.ok) {
                    throw new Error("Ha habido un error al obtener los usuarios.");
                }
                const data = await response.json();
                setUserInfo(data)
                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
        console.log(userInfo)
    }, [token]);


    if (loading) {
        return;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={classes.container}>
            <img src="/icon/user-grande-icon.svg" alt="user icon" className={classes.userIcon} />
            <div className={classes.userInfo}>
                <div>Nombre de usuario: {userInfo.name + " " + userInfo.surname}</div>
                <div>Correo electronico: {userInfo.email}</div>
                <div>Direccion: {userInfo.address}</div>
                <div>Rol: {userInfo.rol}</div>
            </div>

        </div>
    );
}

export default UserData;
