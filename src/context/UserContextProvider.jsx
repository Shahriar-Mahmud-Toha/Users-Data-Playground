import { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    return (
        <UserContext.Provider value={{ users, setUsers, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );  
};

export default UserContextProvider;