import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

// Helper function to check if the user is authenticated and authorized
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Check if a token exists
};

const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        return payload.role === 'admin'; // Check if role is admin
    } catch (error) {
        return false;
    }
};

// Protected route wrapper
const ProtectedRoute = ({ element, isAdminRoute }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    if (isAdminRoute && !isAdmin()) {
        return <Navigate to="/" replace />;
    }
    return element;
};

const App = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login after logout
    };

    return (
        <Router>
            <Navbar onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                    path="/admin"
                    element={<ProtectedRoute element={<AdminPage />} isAdminRoute={true} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
