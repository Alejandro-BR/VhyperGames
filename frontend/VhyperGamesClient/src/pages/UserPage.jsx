import UserData from "../components/UserProfile/UserData";
import classes from '../styles/UserPage.module.css'
import Title from "../components/Titles/Title";
import PaymentOrder from "../components/PaymentConfirmation/PaymentOrder";
import Button from "../components/Buttons/Button";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import UserModal from "../components/UserProfile/UserModal";

function UserPage() {
    const [editData, setEditData] = useState(false);

    return (
        <>
            <div className={classes.pageContainer}>
                <UserData />
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