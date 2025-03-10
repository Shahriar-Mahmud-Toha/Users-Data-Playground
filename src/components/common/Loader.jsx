import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Loader = () => {
    const { loading } = useContext(UserContext);
    return (
        <div className={loading ? "block text-center" : "hidden"}>
            <span className="loading loading-spinner loading-xl mb-5"></span>
        </div>
    );
};

export default Loader;