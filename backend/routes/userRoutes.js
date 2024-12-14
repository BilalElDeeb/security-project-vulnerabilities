const express = require('express');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
const User = require('../models/user');

// Get all users (Admin-only)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
});

// Delete a user (Admin-only)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

module.exports = router;
