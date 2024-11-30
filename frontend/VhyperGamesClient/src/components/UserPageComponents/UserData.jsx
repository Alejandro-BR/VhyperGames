import { useEffect, useState } from "react";
import { GET_USERS } from "../../config";
import classes from "./UserData.module.css"

function UserData({ id }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    

    useEffect(() => {
        if (id === 0) {
            setError("Error: no hay ningún usuario asociado.");
            setLoading(false);
            return;
        }

        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${GET_USERS}`);
                if (!response.ok) {
                    throw new Error("Ha habido un error al obtener los usuarios.");
                }
                const data = await response.json();

                setUserInfo(data[id - 1]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [id]);


    if (loading) {
        return;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={classes.container}>
            <img src="/icon/user-grande-icon.svg" alt="user icon" className={classes.userIcon}/>
            <div className={classes.userInfo}>    
                <div>Nombre del usuario: {userInfo.name +" "+ userInfo.surname}</div>
                <div>Correo electronico: {userInfo.email}</div>
                <div>Direccion: {userInfo.address}</div>
                <div>Rol: {userInfo.rol}</div>
            </div>
            
        </div>
    );
}

export default UserData;
