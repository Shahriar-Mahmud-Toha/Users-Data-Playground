const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 mt-50">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All rights reserved.</p>
            </aside>
        </footer>
    );
};

export default Footer;