const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/databaseConnection');
const authenticationRoutes = require('./routes/authenticationRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDb();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for requests from the frontend
app.use(cors({
    origin: 'http://localhost:3000', // Allow only frontend origin
}));

// Define routes
app.use('/api/authentication', authenticationRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
