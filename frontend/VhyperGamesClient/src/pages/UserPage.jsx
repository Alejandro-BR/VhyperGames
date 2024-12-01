import UserData from "../components/UserPageComponents/UserData";
import { useAuth } from '../context/authcontext'
import classes from '../styles/UserPage.module.css'
import Title from "../components/titleComponent/Title";
import PaymentOrder from "../components/PaymentConfirmationComponent/PaymentOrder";
import Button from "../components/buttonComponent/Button";
import Footer from "../components/footerComponent/Footer";
import { useState } from "react";
import UserModal from "../components/UserPageComponents/UserModal";

function UserPage() {
    const { userId } = useAuth();
    const [editData, setEditData] = useState(false);

    return (
        <>
            <div className={classes.pageContainer}>
                <UserData id={userId} />
                <Button onClick={() => setEditData(true)} children="Modificar datos" variant="large" color="morado" />
                <hr className={classes.line} />
                <Title text={"TUS PEDIDOS REALIZADOS"} />
                <PaymentOrder />
            </div>
            <Footer />

            {editData && (
                <UserModal
                    onClose={() => setEditData(false)}
                />
            )}
        </>

    )
}

export default UserPage;