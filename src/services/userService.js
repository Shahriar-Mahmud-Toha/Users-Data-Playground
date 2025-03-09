import axios from "axios";

const API_URL = "https://dummyjson.com/users";

export const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data.users;
};

export const addUser = async (user) => {
    return await axios.post(`${API_URL}/add`, user);
};

export const updateUser = async (id, user) => {
    return await axios.patch(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
