import '../styles/Home.css'
import '../styles/Forms.css'
import '../styles/Bookings.css'
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

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
                // Refresh the bookings list
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
                <h1 className="bookings-title">My Bookings</h1>
                {bookingsArray.length === 0 ? (
                    <div className="no-bookings">
                        <p>You don't have any bookings yet.</p>
                        <a href="/Bookcar" className="book-now-link">Book a Car Now</a>
                    </div>
                ) : (
                    <div className="bookings-grid">
                        {bookingsArray.map((booking) => (
                            <div className="booking-card" key={booking._id}>
                                <div className="booking-image">
                                    <img src={booking.Carimg} alt={booking.Name} />
                                </div>
                                <div className="booking-details">
                                    <h3 className="booking-car-name">{booking.Name}</h3>
                                    <div className="booking-info">
                                        <div className="info-item">
                                            <span className="info-label">Date</span>
                                            <span className="info-value">{new Date(booking.Date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Check-in Time</span>
                                            <span className="info-value">{booking.CheckinTime}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Duration</span>
                                            <span className="info-value">{booking.Hours} hours</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Registration No</span>
                                            <span className="info-value">{booking.Regno}</span>
                                        </div>
                                    </div>
                                    <div className="booking-actions">
                                        <div className="booking-status">
                                            <span className="status-badge">Confirmed</span>
                                        </div>
                                        <button 
                                            className="cancel-button"
                                            onClick={() => handleCancelBooking(booking._id)}
                                        >
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
