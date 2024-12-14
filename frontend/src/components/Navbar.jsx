import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.reload();
    };

    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                </li>
                {username ? (
                    <>
                        <li style={styles.navItem}>
                            <span style={styles.navLink}>Hello, {username}</span>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/admin" style={styles.navLink}>Admin Panel</Link>
                        </li>
                        <li style={styles.navItem}>
                            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li style={styles.navItem}>
                            <Link to="/login" style={styles.navLink}>Login</Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/signup" style={styles.navLink}>Signup</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#007bff',
        padding: '10px',
    },
    navList: {
        display: 'flex',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    },
    navItem: {
        marginRight: '15px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
};

export default Navbar;
