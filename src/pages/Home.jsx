import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import UserManagement from "../components/users/UserManagement";

const Home = () => {
    return (
        <div>
            <Header />
            <UserManagement />
            <Footer />
        </div>
    );
};

export default Home;