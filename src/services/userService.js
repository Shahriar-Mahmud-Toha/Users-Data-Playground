import axios from "axios";
import { sleep } from "../utils/helpers";

const API_URL = "https://dummyjson.com/users";

export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        // await sleep(5000);
        return response.data.users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const addUser = async (user) => {
    try {
        return await axios.post(`${API_URL}/add`, user);
    } catch (error) {
        console.error("Error adding users:", error);
        return [];
    }
};

export const updateUser = async (id, user) => {
    try {
        return await axios.patch(`${API_URL}/${id}`, user);
    } catch (error) {
        console.error("Error updating users:", error);
        return [];
    }
};

export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting users:", error);
        return [];
    }
};

export const extractFormData = (formObj) => {
    if (!formObj) return { ...INITIAL_USER_FORM_STATE };

    return {
        id: formObj.id || "",
        firstName: formObj.firstName || "",
        lastName: formObj.lastName || "",
        address: {
            city: formObj.address?.city || "",
        },
        gender: formObj.gender || "",
        birthDate: formObj.birthDate || "",
        email: formObj.email || "",
        phone: formObj.phone || "",
        eyeColor: formObj.eyeColor || ""
    };
};
