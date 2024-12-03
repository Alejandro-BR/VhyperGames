import Title from "../components/Titles/Title";
import SearchBarUsers from "../components/UsersManagement/searchBarUsers";
import UserCardBlock from "../components/UsersManagement/userCardBlock";

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