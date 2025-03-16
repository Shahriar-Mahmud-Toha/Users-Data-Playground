import { useContext, useState } from "react";
import UserSearchContext from "../../context/UserSearchContext";

const SearchInput = () => {
    const { search, handleSearch } = useContext(UserSearchContext);
    return (
        <label className="input flex items-center gap-2 border border-gray-300 rounded-lg p-2 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input
                type="search"
                required
                placeholder="Search"
                onChange={handleSearch}
                value={search}
                className="bg-transparent outline-none focus:ring-0 focus:border-none"
            />
        </label>
    );
};

export default SearchInput;