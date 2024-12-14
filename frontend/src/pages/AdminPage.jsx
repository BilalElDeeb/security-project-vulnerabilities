import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await apiClient.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await apiClient.delete(`/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleEdit = (userId) => {
        // Navigate to an edit page or display an edit modal
        console.log('Edit user:', userId);
    };

    useEffect(() => {
        fetchUsers();
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
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user._id)}>Edit</button>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
