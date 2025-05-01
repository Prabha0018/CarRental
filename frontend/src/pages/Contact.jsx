import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Contact.css';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaTimes, FaCar, FaHeadset, FaClock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const [showMailForm, setShowMailForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleEmailClick = () => {
        setShowMailForm(true);
    };

    const handleCloseForm = () => {
        setShowMailForm(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://carrental-r6zl.onrender.com/api/contact/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Message sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setShowMailForm(false);
            } else {
                toast.error(data.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className="contact-container">
            <Navbar />
            <ToastContainer />
            <div className="contact-hero">
                <div className="hero-content">
                    <h1>Get in Touch</h1>
                    <p>We're here to help you with all your car rental needs</p>
                </div>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="contact-card" onClick={handleEmailClick}>
                        <div className="card-icon">
                            <FaEnvelope />
                        </div>
                        <h3>Email Support</h3>
                        <p>prabhakarandcse@gmail.com</p>
                        <span className="card-action">Send us a message</span>
                    </div>
                    <div className="contact-card">
                        <div className="card-icon">
                            <FaPhone />
                        </div>
                        <h3>24/7 Support</h3>
                        <p>+91 1234567890</p>
                        <span className="card-action">Call us anytime</span>
                    </div>
                    <div className="contact-card">
                        <div className="card-icon">
                            <FaMapMarkerAlt />
                        </div>
                        <h3>Our Location</h3>
                        <p>India</p>
                        <span className="card-action">Visit our office</span>
                    </div>
                </div>

                <div className="contact-features">
                    <div className="feature-card">
                        <FaCar className="feature-icon" />
                        <h3>Wide Range of Vehicles</h3>
                        <p>Choose from our extensive fleet of premium vehicles</p>
                    </div>
                    <div className="feature-card">
                        <FaHeadset className="feature-icon" />
                        <h3>24/7 Customer Support</h3>
                        <p>Our team is always ready to assist you</p>
                    </div>
                    <div className="feature-card">
                        <FaClock className="feature-icon" />
                        <h3>Flexible Rental Periods</h3>
                        <p>Rent for hours, days, or weeks as per your need</p>
                    </div>
                </div>
            </div>

            {showMailForm && (
                <div className="mail-form-overlay">
                    <div className="mail-form-container">
                        <button className="close-button" onClick={handleCloseForm}>
                            <FaTimes />
                        </button>
                        <h2>Send us a Message</h2>
                        <p className="form-subtitle">We'll get back to you within 24 hours</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What's this about?"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-button">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact; 