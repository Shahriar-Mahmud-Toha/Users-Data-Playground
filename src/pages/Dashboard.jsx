import { useContext, useEffect } from "react";
import GenderComparison from "../components/dashboard/GenderComparison";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import UserContext from "../context/UserContext";
import { getUsers } from './../services/userService';
import AgeClassification from "../components/dashboard/AgeClassification";

const Dashboard = () => {
    const { users, setUsers, setLoading } = useContext(UserContext);

    useEffect(() => {
        if (users && users.length > 0) return;

        getUsers()
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Header />
            <div className="c-container flex flex-col lg:flex-row lg:justify-evenly gap-5">
                <GenderComparison />
                <AgeClassification />
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;