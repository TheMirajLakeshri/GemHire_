import { Link, useLocation } from 'react-router-dom'; 
import React, { useState } from 'react';
import './Navbar.css'; // Adjust the import path as necessary

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation(); // Get the current location

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev); // Using functional state update
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">GemHire</Link>
            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                <li><Link to="/">Home</Link></li> {/* Link to home */}
                <li><Link to="/aboutus">About Us</Link></li>
                <li><Link to="/news">Today's News</Link></li> 
                {location.pathname === '/' ? (
                    <li><Link to="/signup">Sign Up</Link></li> // Show Sign Up on home page
                ) : (
                    <li><Link to="/">Login</Link></li> // Show Login on signup page
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
