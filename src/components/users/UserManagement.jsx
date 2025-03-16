import { useEffect, useContext } from "react";
import { getUsers } from "../../services/userService";
import UsersTable from "./UsersTable";
import UserForm from "./UserForm";
import Loader from './../common/Loader';
import UserContext from "../../context/UserContext";
import UserFormContextProvider from "../../context/UserFormContextProvider";
import SearchInput from './../common/SearchInput';
import UserSearchContextProvider from "../../context/UserSearchContextProvider";

const UserManagement = () => {

    const { users, setUsers, setLoading } = useContext(UserContext);

    useEffect(() => {
        if (users && users.length > 0) return;

        getUsers()
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="c-container">
            <UserFormContextProvider>
                <div className="mb-10">
                    <UserForm />
                </div>
                <UserSearchContextProvider>
                    <div className="mb-10 flex justify-center">
                        <SearchInput />
                    </div>
                    <Loader />
                    <UsersTable />
                </UserSearchContextProvider>
            </UserFormContextProvider>
        </div>
    );
};

export default UserManagement;