import { useContext } from "react";
import UserFormContext from "../context/UserFormContext";

const useUserForm = () => useContext(UserFormContext);

export default useUserForm;

