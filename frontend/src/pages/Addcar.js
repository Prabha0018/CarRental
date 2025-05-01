import '../styles/Home.css';
import '../styles/Forms.css';
import '../styles/Addcar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { FaCar, FaKey } from 'react-icons/fa';
import { useState } from 'react';

const Addcar = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [isFileUpload, setIsFileUpload] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [showPasskeyPopup, setShowPasskeyPopup] = useState(true);
    const [passkey, setPasskey] = useState('');

    const verifyPasskey = async () => {
        try {
            const response = await fetch('http://localhost:4004/api/verify-passkey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ passkey }),
            });

            if (response.ok) {
                setShowPasskeyPopup(false);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Invalid passkey');
            }
        } catch (error) {
            toast.error('Error verifying passkey');
            console.error('Error:', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setImageUrl('');
            
            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        setSelectedFile(null);
        setFileName('');
        setImagePreview(url);
    };

    const submitntnclick = async() => {
        const Name = document.getElementById('name').value;
        const Rate = document.getElementById('rate').value;
        const Year = document.getElementById('year').value;
        const Color = document.getElementById('color').value;
        const Regno = document.getElementById('regno').value;

        if (!Name || !Rate || !Year || !Color || !Regno || (!selectedFile && !imageUrl)) {
            toast.error('All fields are required');
            return;
        }
    
        if (isNaN(Rate) || isNaN(Year)) {
            toast.error('Rate and year must be numeric values');
            return;
        }
    
        if (Rate <= 0) {
            toast.error('Rate must be a positive value');
            return;
        }
    
        if (Year < 1886 || Year > 2024) {
            toast.error('Year must be between 1886 and 2024');
            return;
        }

        try {
            let finalImageUrl = imageUrl;

            if (isFileUpload && selectedFile) {
                // Upload the image if file is selected
                const formData = new FormData();
                formData.append('carImage', selectedFile);
                formData.append('passkey', passkey);

                const imageUploadResponse = await fetch('http://localhost:4004/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!imageUploadResponse.ok) {
                    const errorData = await imageUploadResponse.json();
                    throw new Error(errorData.error || 'Failed to upload image');
                }

                const { imageUrl: uploadedImageUrl } = await imageUploadResponse.json();
                finalImageUrl = uploadedImageUrl;
            }

            // Create the car with the image URL
            const response = await fetch('http://localhost:4004/api/createcar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    Name, 
                    Rate, 
                    Year, 
                    Color, 
                    Regno, 
                    Carimg: finalImageUrl,
                    passkey 
                }),
            });

            if (response.ok) {
                const message = await response.text();
                if (message === 'Car Added Successfully') {
                    toast.success('Car Added Successfully');
                    // Clear form
                    document.getElementById('name').value = '';
                    document.getElementById('rate').value = '';
                    document.getElementById('year').value = '';
                    document.getElementById('color').value = '';
                    document.getElementById('regno').value = '';
                    if (document.getElementById('carimg')) {
                        document.getElementById('carimg').value = '';
                    }
                    if (document.getElementById('imageUrl')) {
                        document.getElementById('imageUrl').value = '';
                    }
                    setSelectedFile(null);
                    setFileName('');
                    setImagePreview(null);
                    setImageUrl('');
                }
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to add car');
            }
        } catch (error) {
            toast.error(error.message || 'Error occurred while processing your request');
            console.error('Error:', error);
        }
    };

    if (showPasskeyPopup) {
        return (
            <div className="page-container">
                <Navbar />
                <ToastContainer />
                <div className="passkey-popup">
                    <div className="passkey-popup-content">
                        <h2>Enter Passkey</h2>
                        <div className="form-group">
                            <label>
                                <FaKey className="input-icon" />
                                Passkey
                            </label>
                            <input 
                                type="password" 
                                value={passkey}
                                onChange={(e) => setPasskey(e.target.value)}
                                placeholder="Enter passkey"
                                required
                            />
                        </div>
                        <p className="passkey-note">
                            If you need passkey, <a href="/contact" className="contact-link">contact us</a>
                        </p>
                        <button onClick={verifyPasskey} className="submit-button">
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <Navbar />
            <ToastContainer />
            <div className="add-car-container">
                <div className="book-car-header">
                    <h1>Add Your Car</h1>
                    <p>Fill in the details below to Add your vehicle</p>
                </div>
                <div className="form-container">
                    <div className="form-wrapper">
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Car preview" />
                            </div>
                        )}
                        <form className="form">
                            <div className="form-group">
                                <label>
                                    <FaCar className="input-icon" />
                                    Car Name
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    placeholder="Enter car name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <FaCar className="input-icon" />
                                    Year
                                </label>
                                <input 
                                    type="number" 
                                    id="year" 
                                    placeholder="Enter manufacturing year"
                                    required
                                    min="1886"
                                    max="2024"
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <FaCar className="input-icon" />
                                    Color
                                </label>
                                <input 
                                    type="text" 
                                    id="color" 
                                    placeholder="Enter car color"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <FaCar className="input-icon" />
                                    Registration Number
                                </label>
                                <input 
                                    type="text" 
                                    id="regno" 
                                    placeholder="Enter registration number"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <FaCar className="input-icon" />
                                    Rate per Hour
                                </label>
                                <input 
                                    type="number" 
                                    id="rate" 
                                    placeholder="Enter rate per hour"
                                    required
                                    min="1"
                                />
                            </div>

                            <div className="form-group">
                                <label>Car Image</label>
                                <div className="image-input-toggle">
                                    <button 
                                        type="button"
                                        className={`toggle-button ${isFileUpload ? 'active' : ''}`}
                                        onClick={() => setIsFileUpload(true)}
                                    >
                                        Upload File
                                    </button>
                                    <button 
                                        type="button"
                                        className={`toggle-button ${!isFileUpload ? 'active' : ''}`}
                                        onClick={() => setIsFileUpload(false)}
                                    >
                                        Image URL
                                    </button>
                                </div>

                                {isFileUpload ? (
                                    <div className="file-input-wrapper">
                                        <div className="file-input-container">
                                            <input 
                                                type="file"
                                                id="carimg"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                required={isFileUpload}
                                                className="file-input"
                                            />
                                            <button type="button" className="choose-file-button">
                                                Choose File
                                            </button>
                                        </div>
                                        {fileName && <span className="file-name">{fileName}</span>}
                                    </div>
                                ) : (
                                    <input 
                                        type="url"
                                        id="imageUrl"
                                        placeholder="Enter image URL"
                                        value={imageUrl}
                                        onChange={handleUrlChange}
                                        required={!isFileUpload}
                                        className="url-input"
                                    />
                                )}
                            </div>

                            <button type="button" onClick={submitntnclick} className="submit-button">
                                Add Car
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addcar;
