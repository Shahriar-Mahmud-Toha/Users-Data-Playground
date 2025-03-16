import { useContext, useEffect, useRef, useState } from "react";
import { INITIAL_USER_FORM_STATE } from "../utils/constants";
import UserContext from "./UserContext";
import { addUser, deleteUser, extractFormData, updateUser } from "../services/userService";
import UserFormContext from "./UserFormContext";
import userFormValidator from "../utils/userFormValidator";

const UserFormContextProvider = ({ children }) => {
    const formData = useRef(INITIAL_USER_FORM_STATE);
    const formRef = useRef(null);
    const availableUserId = useRef(31);
    const [editingUserId, setEditingUserId] = useState(null);
    const { users, setUsers } = useContext(UserContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "city") {
            formData.current = {
                ...formData.current,
                address: { ...formData.current.address, city: value },
                id: availableUserId.current
            };
        }
        else {
            formData.current = {
                ...formData.current,
                [name]: value,
                id: availableUserId.current
            };
        }
    };

    const resetForm = () => {
        formRef.current.reset();
        formData.current = INITIAL_USER_FORM_STATE;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const validationError = userFormValidator(formData.current);
            if (validationError !== null) {
                alert(validationError);
                return;
            }

            const formObj = await extractFormData(formData.current);
            if (editingUserId) {
                if (editingUserId <= 30) { // Development mode
                    const response = await updateUser(editingUserId, formObj);
                    setUsers(users.map(user => user.id === editingUserId ? response.data : user));
                } else {
                    setUsers(users.map(user => user.id === editingUserId ? formData.current : user));
                }
                setEditingUserId(null);
            } else {
                const response = await addUser(formObj);
                // setUsers([...users, response.data]); // Production mode
                setUsers([...users, formObj]); // Development mode
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

    const handleEditUser = (user) => {
        try {
            resetForm();
            formData.current = user;
            setEditingUserId(user.id);
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (error) {
            console.error("Error while filling user data:", error);
        }
    };

    return (
        <UserFormContext.Provider
            value={{
                formData,
                formRef,
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
