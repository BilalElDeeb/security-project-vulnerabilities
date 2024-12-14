import React, { useState } from 'react';
import axios from '../api/apiClient';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/authentication/login', { email, password });
            if (response.data) {
                // Save username to localStorage
                localStorage.setItem('username', response.data.user.username);
                alert('Login successful!');
                window.location.reload(); // Reload to update the Navbar
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
