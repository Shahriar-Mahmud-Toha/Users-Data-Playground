import { NavLink, Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="c-container flex justify-between items-center">
                <div className="dropdown lg:absolute">
                    <button tabIndex={0} role="button" className="btn btn-ghost pl-0 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </button>
                    <ul tabIndex={0}
                        className="border-r-2 border-b-2 border-accent dropdown-content bg-base-100 rounded-box z-1 ml-[-0.5rem] pl-3 pr-3 pb-3 shadow">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    </ul>
                </div>
                <ul className="menu menu-horizontal px-1 max-lg:hidden">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                </ul>
                <NavLink className="text-accent text-sm sm:text-xl font-bold flex items-center" to="/">Users Data Playground<img src="/udp-logo.svg" alt="Users Data Playground - Logo" className="h-10 w-auto ml-3"/></NavLink>
            </nav>
        </header>
    );
};

export default Header;