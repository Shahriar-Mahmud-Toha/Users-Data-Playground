import { useState } from "react";
import UserSearchContext from "./UserSearchContext";

const UserSearchContextProvider = ({ children }) => {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <UserSearchContext.Provider
            value={{
                search,
                setSearch,
                handleSearch,
            }}
        >
            {children}
        </UserSearchContext.Provider>
    );
};

export default UserSearchContextProvider;
