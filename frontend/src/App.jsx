import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home.jsx';
import Addcar from './pages/Addcar.js';
import Bookings from './pages/Bookings.js';
import Bookcar from './pages/Bookcar.js';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Contact from './pages/Contact.jsx';

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated()) {
        return <Navigate to="/signin" />;
    }

    return children;
};

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/bookings" element={
                        <ProtectedRoute>
                            <Bookings />
                        </ProtectedRoute>
                    } />
                    <Route path="/addcar" element={
                        <ProtectedRoute>
                            <Addcar />
                        </ProtectedRoute>
                    } />
                    <Route path="/bookcar" element={
                        <ProtectedRoute>
                            <Bookcar />
                        </ProtectedRoute>
                    } />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

// Default export
export default App; 