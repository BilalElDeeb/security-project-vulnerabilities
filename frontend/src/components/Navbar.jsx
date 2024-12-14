import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure you have installed jwt-decode
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let username = '';

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            username = (decodedToken.username || '').replace(/<[^>]+>/g, '');
        } catch (error) {
            console.error('Error decoding token:', error);
            username = '';
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {token && <Link to="/admin">Admin</Link>}
            </div>
            <div className="navbar-actions">
                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                ) : (
                    <>
                        <span className="welcome-message">Hello, {username}!</span>
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
