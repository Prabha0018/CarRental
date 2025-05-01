import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

const Home = () => {
    const [carsArray, setCarsArray] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://carrental-r6zl.onrender.com/api/allcars', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const carsData = await response.json();
                    setCarsArray(carsData);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Check if token exists when component mounts
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleBookNow = (regno) => {
        navigate(`/Bookcar?regno=${regno}`);
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/signin');
    };

    const handleSignIn = () => {
        navigate('/signin');
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to CarHub</h1>
                    <p>Find your perfect ride with our premium collection of vehicles</p>
                </div>
            </div>

            <div className="cars-section">
                <h2 className="section-title">Available Cars</h2>
                <div className="cars-grid">
                    {carsArray.map((car) => (
                        <div className="car-card" key={car._id}>
                            <div className="car-image-container">
                                <img src={car.Carimg} alt={car.Name} className="car-image" />
                            </div>
                            <div className="detail-item">
                                   
                                   <span className="detail-label">Name</span>
                                   <span className="detail-value">{car.Name || 'N/A'}</span>
                               </div>

                            <div className="car-details-grid">
                           
                                <div className="detail-item">
                                    <span className="detail-icon">📅</span>
                                    <span className="detail-label">Year</span>
                                    <span className="detail-value">{car.Year || 'N/A'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-icon">🎨</span>
                                    <span className="detail-label">Color</span>
                                    <span className="detail-value">{car.Color || 'N/A'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-icon">💰</span>
                                    <span className="detail-label">Rate</span>
                                    <span className="detail-value">₹{car.Rate || '0'}/day</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-icon">🔢</span>
                                    <span className="detail-label">Reg No</span>
                                    <span className="detail-value">{car.Regno || 'N/A'}</span>
                                </div>
                            </div>

                            <button className="book-button" onClick={() => handleBookNow(car.Regno)}>
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-icon">🔍</div>
                        <h3>Find a Car</h3>
                        <p>Browse our selection of premium vehicles</p>
                    </div>
                    <div className="step">
                        <div className="step-icon">📅</div>
                        <h3>Book Your Dates</h3>
                        <p>Choose your pickup and return dates</p>
                    </div>
                    <div className="step">
                        <div className="step-icon">🚗</div>
                        <h3>Enjoy Your Ride</h3>
                        <p>Get the keys and start your journey</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
