import React, { useEffect, useState } from 'react';
import axios from '../api/apiClient';

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            alert('Failed to fetch users');
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            alert('User deleted successfully');
            fetchUsers(); // Refresh the user list
        } catch (error) {
            alert('Failed to delete user');
        }
    };

    const editUser = async (id) => {
        const newUsername = prompt('Enter new username:');
        if (!newUsername) return;

        try {
            await axios.put(`/api/users/${id}`, { username: newUsername });
            alert('User updated successfully');
            fetchUsers(); // Refresh the user list
        } catch (error) {
            alert('Failed to update user');
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch users on component mount
    }, []);

    return (
        <div>
            <h1>Admin Panel</h1>
            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => editUser(user._id)}>Edit</button>
                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
