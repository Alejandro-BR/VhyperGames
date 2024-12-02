import Title from "../components/titleComponent/Title";
import SearchBarUsers from "../components/usersManagement/SearchBarUsers";
import UserCardBlock from "../components/usersManagement/UserCardBlock";

function UsersManagement() {

    return (

        <div className="generalContainer">
            <Title text="USUARIOS:" size="3em" color="#fff" align="center" />
            <SearchBarUsers />
            <UserCardBlock />
        </div>

    )
}

export default UsersManagement