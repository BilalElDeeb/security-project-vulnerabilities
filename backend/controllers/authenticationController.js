const User = require('../models/user');

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne(req.body); // Vulnerable to NoSQL injection
        if (user) {
            return res.status(200).json({ message: 'Login successful', user });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

const signupUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { loginUser, signupUser };
