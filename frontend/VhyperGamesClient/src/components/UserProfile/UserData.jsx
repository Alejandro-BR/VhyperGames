import { useEffect, useState } from "react";
import { GET_USER } from "../../config";
import classes from "./UserData.module.css"
import { useAuth, } from "../../context/AuthContext";
import Button from "../Buttons/Button";
import UserModal from "./UserModal";
import PasswordModal from "./PasswordModal";

function UserData() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const { token, decodedToken } = useAuth();

    const [editData, setEditData] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    useEffect(() => {
        if (!token) {
            return; 
        }

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
    }, [token, editData]);


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
                <h2>Tus Datos:</h2>
                <div>Nombre de usuario: {userInfo.name + " " + userInfo.surname}</div>
                <div>Correo electronico: {userInfo.email}</div>
                <div>Direccion: {userInfo.address}</div>
                {token && (decodedToken?.role === "Admin") && (
                    <div>Rol: Admin</div>

                )}
            </div>

            <div className={classes.buttons}>
                <Button onClick={() => setEditData(true)} children="Modificar datos" variant="large" color="morado-azul" />
                <Button onClick={() => setEditPassword(true)} children="Contraseña" variant="large" color="azul-morado" />
            </div>

            {editData && (
                <UserModal
                    onClose={() => setEditData(false)}
                    userInfo={userInfo}
                />
            )}

            {editPassword && (
                <PasswordModal
                    onClose={() => setEditPassword(false)}
                />
            )}
        </div>
    );
}

export default UserData;
