import '../styles/Home.css'
import '../styles/Forms.css'
import '../styles/Bookings.css'
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { FaCar, FaCalendarAlt, FaClock, FaIdCard, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

const Bookings = () => {
    const [bookingsArray, setBookingsArray] = useState([]);

    const fetchBookings = async () => {
        try {
            const response = await fetch('http://localhost:4004/api/allbooks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const booksData = await response.json();
                setBookingsArray(booksData);
            } else {
                toast.error('Failed to fetch bookings');
            }
        } catch (error) {
            toast.error('Error fetching bookings');
        } 
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:4004/api/cancelbook/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                toast.success('Booking cancelled successfully');
                fetchBookings();
            } else {
                toast.error('Failed to cancel booking');
            }
        } catch (error) {
            toast.error('Error cancelling booking');
        }
    };

    return (
        <div className="page-container">
            <Navbar />
            <div className="bookings-container">
                <div className="bookings-header">
                    <h1 className="bookings-title">
                        <FaCar className="header-icon" /> My Bookings
                    </h1>
                    <p className="bookings-subtitle">Manage your car rental reservations</p>
                </div>

                {bookingsArray.length === 0 ? (
                    <div className="no-bookings">
                        <div className="no-bookings-content">
                            <FaCar className="no-bookings-icon" />
                            <h2>No Active Bookings</h2>
                            <p>You don't have any active car rentals at the moment.</p>
                            <a href="/Bookcar" className="book-now-button">
                                <FaCar className="button-icon" /> Book a Car Now
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="bookings-grid">
                        {bookingsArray.map((booking) => (
                            <div className="booking-card" key={booking._id}>
                                <div className="booking-image-container">
                                    <img src={booking.Carimg} alt={booking.Name} className="booking-image" />
                                    <div className="booking-status-badge">
                                        <FaCheckCircle className="status-icon" />
                                        <span>Confirmed</span>
                                    </div>
                                </div>
                                <div className="booking-details">
                                    <h3 className="booking-car-name">{booking.Name}</h3>
                                    <div className="booking-info">
                                        <div className="info-item">
                                            <FaCalendarAlt className="info-icon" />
                                            <div className="info-content">
                                                <span className="info-label">Booking Date</span>
                                                <span className="info-value">{new Date(booking.Date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <FaClock className="info-icon" />
                                            <div className="info-content">
                                                <span className="info-label">Check-in Time</span>
                                                <span className="info-value">{booking.CheckinTime}</span>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <FaClock className="info-icon" />
                                            <div className="info-content">
                                                <span className="info-label">Duration</span>
                                                <span className="info-value">{booking.Hours} hours</span>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <FaIdCard className="info-icon" />
                                            <div className="info-content">
                                                <span className="info-label">Registration No</span>
                                                <span className="info-value">{booking.Regno}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="booking-actions">
                                        <button 
                                            className="cancel-button"
                                            onClick={() => handleCancelBooking(booking._id)}
                                        >
                                            <FaTimesCircle className="button-icon" />
                                            Cancel Booking
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Bookings;
