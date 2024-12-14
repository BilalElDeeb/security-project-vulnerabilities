import React, { useState } from 'react';
import axios from '../api/apiClient';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/authentication/signup', { username, email, password });
            alert(response.data.message); // Success message
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setError(error.response.data.errors.map(err => err.msg).join('\n')); // Update error state
            } else {
                setError('Signup failed. Please try again.'); // Update error state
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Signup</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default SignupForm;
