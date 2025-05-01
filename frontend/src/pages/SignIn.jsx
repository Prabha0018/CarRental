import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Signin.css';

const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://carrental-r6zl.onrender.com/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Sign in failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            toast.success('Sign in successful!');
            navigate('/');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        } 
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="auth-overlay">
                    <h1>Welcome to CarHub</h1>
                    <p>Your premium car rental destination</p>
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-form-container">
                    <div className="auth-header">
                        <h2>Sign In to CarHub</h2>
                        <p>Access your account to start renting</p>
                    </div>
                    <form className="auth-form" onSubmit={handleSignin}>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-group">
                                <i className="fas fa-envelope"></i>
                                <input 
                                    type="email" 
                                    id="email"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    placeholder="Enter your email"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <i className="fas fa-lock"></i>
                                <input 
                                    type="password" 
                                    id="password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    placeholder="Enter your password"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Signin;
