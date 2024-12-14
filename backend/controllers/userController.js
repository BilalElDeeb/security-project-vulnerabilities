const User = require('../models/user');
const { body, validationResult } = require('express-validator');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = [
    body('username').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { username, email } = req.body;

        try {
            const user = await User.findByIdAndUpdate(
                id,
                { username, email },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

module.exports = { getAllUsers, deleteUser, updateUser };
