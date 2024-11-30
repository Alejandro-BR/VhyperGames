import UserData from "../components/UserPageComponents/UserData";
import { useAuth } from '../context/authcontext'
import classes from '../styles/UserPage.module.css'
import Title from "../components/titleComponent/Title";
import PaymentOrder from "../components/PaymentConfirmationComponent/PaymentOrder";

function UserPage() {
    const {userId} = useAuth();


    return(
        <div className={classes.pageContainer}>
            <UserData id={userId}/>
            <hr className={classes.line} />
            <Title text={"TUS PEDIDOS REALIZADOS"}/> 
            <PaymentOrder/>

        </div>
        
    )
}

export default UserPage;