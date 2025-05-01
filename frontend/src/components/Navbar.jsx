import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaUser } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists when component mounts
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        setIsLoggedIn(!!token);
        if (user) {
            setUserInfo(user);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserInfo(null);
        setShowUserMenu(false);
        navigate('/signin');
    };

    const handleSignIn = () => {
        navigate('/signin');
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
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
                        <li><Link to="/contact">Contact</Link></li>
                        <li className="user-section">
                            {isLoggedIn ? (
                                <div className="user-info">
                                    <div className="user-profile" onClick={toggleUserMenu}>
                                        <FaUser className="user-icon" />
                                        <span className="user-name">{userInfo?.name}</span>
                                    </div>
                                    {showUserMenu && (
                                        <div className="user-menu">
                                            <div className="user-details">
                                                <p className="user-email">{userInfo?.email}</p>
                                            </div>
                                            <button onClick={handleSignOut} className="nav-button signout-btn">
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button onClick={handleSignIn} className="nav-button signin-btn">
                                    Sign In
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 