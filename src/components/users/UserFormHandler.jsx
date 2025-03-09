import { useCallback } from "react";
import { addUser, deleteUser, updateUser } from "../../services/userService";
import { INITIAL_USER_FORM_STATE } from "../../utils/constants";

export const handleInputChange = (e, setFormData, availableUserId) => {
    const { name, value } = e.target;
    
    setFormData(existingData => ({
        ...existingData,
        ...(name === "city"
            ? { address: { ...existingData.address, city: value }, id: availableUserId.current }
            : { [name]: value, id: availableUserId.current })
    }));
};


export const resetForm = (setFormData) => {
    setFormData(INITIAL_USER_FORM_STATE);
};

export const handleFormSubmit = async (e, formData, setFormData, users, setUsers, editingUserId, setEditingUserId, availableUserId) => {
    e.preventDefault();
    try {
        if (editingUserId) {
            if (editingUserId <= 30) {//Only for development stage
                const response = await updateUser(editingUserId, formData);
                setUsers(users.map(user => user.id === editingUserId ? response.data : user));
            }
            else {
                setUsers(users.map(user => user.id === editingUserId ? formData : user));
            }
            setEditingUserId(null);
        }
        else {
            const response = await addUser(formData);
            // setUsers([...users, response.data]); //For production
            setUsers([...users, formData]); //Only for development stage
            availableUserId.current++;
        }
        resetForm(setFormData);
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};

export const handleDeleteUser = async (userId, setUsers, users) => {
    try {
        if (userId <= 30) { //Only for development stage
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        }
        setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

export const handleEditUser = async (user, setFormData, setEditingUserId) => {
    try {
        setFormData(user);
        setEditingUserId(user.id);
    } catch (error) {
        console.error("Error while filling user data:", error);
    }
};