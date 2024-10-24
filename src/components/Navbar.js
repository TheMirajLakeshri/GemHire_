import { Link, useLocation } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';
import pb from '../lib/pocketbase'; // Import your PocketBase instance
import './Navbar.css'; // Adjust the import path as necessary

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation(); // Get the current location

    useEffect(() => {
        // Check if the user is authenticated
        setIsAuthenticated(pb.authStore.isValid); // Returns true if the user is logged in
    }, []);

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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/aboutus">About Us</Link></li>
                <li><Link to="/news">Today's News</Link></li>
                
                {!isAuthenticated && (
                    <>
                        {location.pathname === '/' ? (
                            <li><Link to="/signup">Sign Up</Link></li> // Show Sign Up on home page
                        ) : (
                            <li><Link to="/">Login</Link></li> // Show Login on signup page
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
