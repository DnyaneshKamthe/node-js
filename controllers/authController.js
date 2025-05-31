const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwt');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // use env in prod

// Register (optional)
const register = async (req, res) => {
    try {
        const { username, email, mobile, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        const user = await User.create({ username, email, mobile, password });
        res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

        const token = generateToken({ id: user.id, email: user.email });
        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
// Logout (dummy route since JWT is stateless; implement blacklist if needed)
const logout = (req, res) => {
    // On client side, just delete token; optionally, handle blacklist on server
    res.json({ message: 'Logged out successfully' });
};

// Forgot password (very basic example, should implement email sending in real app)
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Email not found' });

        // Normally, generate reset token and email it. Here we just respond with dummy success
        res.json({ message: 'Password reset link sent (dummy response)' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
};
