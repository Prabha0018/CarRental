import '../styles/Home.css'
import '../styles/Forms.css'
import '../styles/Bookcar.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaCar, FaClock, FaCalendarAlt, FaIdCard } from 'react-icons/fa';

const Bookcar = () => {
    const [searchParams] = useSearchParams();
    const [carImage, setCarImage] = useState('');
    const [carDetails, setCarDetails] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserInfo(user);
        }
    }, []);

    const fetchCarDetails = async (regno) => {
        try {
            const response = await fetch(`https://carrental-r6zl.onrender.com/api/car/${regno}`);
            if (response.ok) {
                const data = await response.json();
                setCarDetails(data);
                setCarImage(data.CarImageURL);
            } else {
                setCarImage('');
                setCarDetails(null);
            }
        } catch (error) {
            console.error('Error fetching car details:', error);
            setCarImage('');
            setCarDetails(null);
        }
    };

    useEffect(() => {
        const regno = searchParams.get('regno');
        if (regno) {
            document.getElementById('regno').value = regno;
            fetchCarDetails(regno);
        }
    }, [searchParams]);

    const handleRegNoChange = (e) => {
        const regno = e.target.value;
        if (regno && regno.length >= 3) { // Only fetch if at least 3 characters are entered
            fetchCarDetails(regno);
        } else {
            setCarImage('');
            setCarDetails(null);
        }
    };

    // Add debounce to prevent too many API calls
    const debouncedHandleRegNoChange = (e) => {
        clearTimeout(window.regNoTimeout);
        window.regNoTimeout = setTimeout(() => {
            handleRegNoChange(e);
        }, 300); // Wait for 300ms after user stops typing
    };

    const bookbtnclick = async() => {
        if (!userInfo) {
            toast.error('Please sign in to book a car');
            return;
        }

        const Regno = document.getElementById('regno').value;
        const Hours = document.getElementById('hours').value;
        const Date = document.getElementById('date').value;
        const CheckinTime = document.getElementById('checkin-time').value;
        const Aadhar = document.getElementById('aadhar').value;

        if (!Regno || !Hours || !Date || !CheckinTime || !Aadhar) {
            toast.error('All fields are required');
            return;
        }

        if (isNaN(Hours) || Hours <= 0) {
            toast.error('Hours must be a positive number');
            return;
        }

        try {
            const response = await fetch('http://localhost:4004/api/createbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    Regno, 
                    Hours, 
                    Date, 
                    CheckinTime, 
                    Aadhar,
                    userId: userInfo.id,
                    userEmail: userInfo.email
                }),
            });

            if (response.ok) {
                const message = await response.text();
                if (message === 'Car Booked Successfully') {
                    toast.success('Car Booked Successfully');
                    // Clear form
                    document.getElementById('regno').value = '';
                    document.getElementById('hours').value = '';
                    document.getElementById('date').value = '';
                    document.getElementById('checkin-time').value = '';
                    document.getElementById('aadhar').value = '';
                    setCarImage('');
                    setCarDetails(null);
                }
            } else {
                const errorMessage = await response.text();
                if (errorMessage === 'Car Not Exists') {
                    toast.error('Car Not Found');
                } else {
                    toast.error('Some problem occurred. Please try again later.');
                }
            }
        } catch (error) {
            toast.error('Error occurred while processing your request. Please try again later.');
        }
    };

    return (
        <div className="page-container">
            <Navbar />
            <div className="book-car-container">
                <div className="book-car-header">
                    <h1>Book Your Car</h1>
                    <p>Fill in the details below to reserve your vehicle</p>
                </div>
                <div className="form-container">
                    <div className="form-wrapper">
                        {carImage && (
                            <div className="car-image-container">
                                <img src={carImage} alt="Selected car" className="car-preview-image" />
                                {carDetails && (
                                    <div className="car-details">
                                        <h3>{carDetails.CarName}</h3>
                                        <p>Rate per Day: ${carDetails.RatePerDay}</p>
                                    </div>
                                )}
                            </div>
                        )}
                        <form className="form">
                            <div className="form-group">
                                <label htmlFor="regno">
                                    <FaCar className="input-icon" />
                                    Car Registration Number
                                </label>
                                <input 
                                    type="text" 
                                    id="regno" 
                                    name="Regno" 
                                    required 
                                    placeholder="Enter car registration number"
                                    onChange={debouncedHandleRegNoChange}
                                    readOnly={searchParams.get('regno') ? true : false}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="hours">
                                    <FaClock className="input-icon" />
                                    Number of Hours
                                </label>
                                <input 
                                    type="number" 
                                    id="hours" 
                                    name="Hours" 
                                    required 
                                    min="1"
                                    placeholder="Enter number of hours"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">
                                    <FaCalendarAlt className="input-icon" />
                                    Booking Date
                                </label>
                                <input 
                                    type="date" 
                                    id="date" 
                                    name="Date" 
                                    required 
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="checkin-time">
                                    <FaClock className="input-icon" />
                                    Check-in Time
                                </label>
                                <input 
                                    type="time" 
                                    id="checkin-time" 
                                    name="CheckinTime" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="aadhar">
                                    <FaIdCard className="input-icon" />
                                    Aadhar Card Number
                                </label>
                                <input 
                                    type="text" 
                                    id="aadhar" 
                                    name="Aadhar" 
                                    required 
                                    placeholder="Enter Aadhar card number"
                                />
                            </div>
                            <button 
                                type="button" 
                                onClick={bookbtnclick} 
                                className="submit-button"
                            >
                                Book Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Bookcar;
