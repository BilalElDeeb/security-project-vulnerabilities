const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

const signUp = [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password, role } = req.body;

        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const user = new User({ username, email, password, role });
            await user.save();

            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    },
];

const signIn = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email, password });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user._id, role: user.role, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ message: 'Login successful', token, user });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in' });
        }
    },
];


module.exports = { signUp, signIn };
