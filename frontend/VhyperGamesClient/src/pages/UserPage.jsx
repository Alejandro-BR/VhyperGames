import UserData from "../components/UserProfile/UserData";
import classes from '../styles/UserPage.module.css'
import Title from "../components/Titles/Title";
import Footer from "../components/Footer/Footer";
import UserOrders from "../components/UserProfile/UserOrders";

function UserPage() {

    return (
        <>
            <div className={classes.pageContainer}>
                <UserData />
                <hr className={classes.line} />
                <Title text={"TUS PEDIDOS REALIZADOS"} />
                <UserOrders/>
                
            </div>
            <Footer />

            
        </>

    )
}

export default UserPage;