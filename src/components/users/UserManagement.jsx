import { useState, useEffect, useRef } from "react";
import { INITIAL_USER_FORM_STATE } from "../../utils/constants";
import { getUsers } from "../../services/userService";
import UsersTable from "./UsersTable";
import UserForm from "./UserForm";

const UserManagement = () => {

    const [formData, setFormData] = useState(INITIAL_USER_FORM_STATE);
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const availableUserId = useRef(31);

    useEffect(() => {
        getUsers()
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    return (
        <div className="c-container">
            <div className="mb-10">
                <UserForm formData={formData} setFormData={setFormData} users={users} setUsers={setUsers} editingUserId={editingUserId} setEditingUserId={setEditingUserId} availableUserId={availableUserId} />
            </div>
            <UsersTable users={users} setUsers={setUsers} setFormData={setFormData} setEditingUserId={setEditingUserId} />
        </div>
    );
};

export default UserManagement;