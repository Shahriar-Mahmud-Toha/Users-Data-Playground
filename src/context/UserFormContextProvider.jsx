import { useContext, useRef, useState } from "react";
import { INITIAL_USER_FORM_STATE } from "../utils/constants";
import UserContext from "./UserContext";
import { addUser, deleteUser, updateUser } from "../services/userService";
import UserFormContext from "./UserFormContext";
import userFormValidator from "../utils/userFormValidator";

const UserFormContextProvider = ({ children }) => {
    const [formData, setFormData] = useState(INITIAL_USER_FORM_STATE);
    const [editingUserId, setEditingUserId] = useState(null);
    const availableUserId = useRef(31);
    const { users, setUsers } = useContext(UserContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((existingData) => {
            if (name === "city") {
                return {
                    ...existingData,
                    address: { ...existingData.address, city: value },
                    id: availableUserId.current
                };
            }
            return { ...existingData, [name]: value, id: availableUserId.current };
        });
    };

    const resetForm = () => {
        setFormData(INITIAL_USER_FORM_STATE);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const validationError = userFormValidator(formData);
            if (validationError !== null) {
                alert(validationError);
                return;
            }
            if (editingUserId) {
                if (editingUserId <= 30) { // Development mode
                    const response = await updateUser(editingUserId, formData);
                    setUsers(users.map(user => user.id === editingUserId ? response.data : user));
                } else {
                    setUsers(users.map(user => user.id === editingUserId ? formData : user));
                }
                setEditingUserId(null);
            } else {
                const response = await addUser(formData);
                // setUsers([...users, response.data]); // Production mode
                setUsers([...users, formData]); // Development mode
                availableUserId.current++;
            }
            resetForm();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            if (userId <= 30) await deleteUser(userId); // Development mode
            setUsers(users.filter(user => user.id !== userId));
            setEditingUserId(null);
            resetForm();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEditUser = async (user) => {
        try {
            setFormData(user);
            setEditingUserId(user.id);
        } catch (error) {
            console.error("Error while filling user data:", error);
        }
    };

    return (
        <UserFormContext.Provider
            value={{
                formData,
                setFormData,
                editingUserId,
                setEditingUserId,
                handleInputChange,
                resetForm,
                handleFormSubmit,
                handleDeleteUser,
                handleEditUser,
                availableUserId,
            }}
        >
            {children}
        </UserFormContext.Provider>
    );
};

export default UserFormContextProvider;
