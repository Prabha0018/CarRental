import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists when component mounts
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/signin');
    };

    const handleSignIn = () => {
        navigate('/signin');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="brand-section">
                    <Link to="/" className="brand-logo">
                        <FaCar className="logo-icon" />
                        <div className="logo-text">
                            <span className="logo-car">Car</span>
                            <span className="logo-hub">Hub</span>
                        </div>
                    </Link>
                </div>
                <div className="navbar-links">
                    <ul>
                        <li><Link to="/Home" className="active">Home</Link></li>
                        <li><Link to="/Addcar">Add Car</Link></li>
                        <li><Link to="/Bookcar">Book Car</Link></li>
                        <li><Link to="/bookings">My Bookings</Link></li>
                        <li>
                            {isLoggedIn ? (
                                <Link to="/signin" onClick={handleSignOut}>Sign Out</Link>
                            ) : (
                                <Link to="/signin" onClick={handleSignIn}>Sign In</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 