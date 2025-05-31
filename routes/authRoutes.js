const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

// Validation and sanitization middleware for register
const registerValidation = [
    body('username').trim().notEmpty().withMessage('Username is required').escape(),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('mobile').trim().notEmpty().withMessage('Mobile number is required').escape(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars').escape(),
];

// Validation and sanitization middleware for login
const loginValidation = [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').escape(),
];

// Middleware to check validation result
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return all validation errors
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Routes with validation
router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    validate
], authController.forgotPassword);

module.exports = router;
