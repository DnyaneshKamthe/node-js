const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const taskController = require('../controllers/taskTrackerController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

// Validation rules for task creation & update
const taskValidationRules = [
    body('taskName').trim().notEmpty().withMessage('Task name is required').escape(),
    body('uatBranchName').optional().trim().escape(),
    body('prodBranchName').optional().trim().escape(),
    body('uatPrUrl').optional().isURL().withMessage('Invalid URL').trim(),
    body('prodPrUrl').optional().isURL().withMessage('Invalid URL').trim(),
    body('isMergedOnUAT').optional().isBoolean().withMessage('Must be boolean'),
    body('isMergedOnProd').optional().isBoolean().withMessage('Must be boolean'),
    body('smallDescription').optional().trim().escape(),
];

// Validate task id param
const idValidation = [
    param('id').isInt({ gt: 0 }).withMessage('Task ID must be a positive integer'),
];

// Routes
router.post('/', authenticateJWT, taskValidationRules, validate, taskController.createTask);
router.get('/', authenticateJWT, taskController.getAllTasks);
router.get('/:id', authenticateJWT, idValidation, validate, taskController.getTaskById);
router.put('/:id', authenticateJWT, idValidation.concat(taskValidationRules), validate, taskController.updateTask);
router.delete('/:id', authenticateJWT, idValidation, validate, taskController.deleteTask);

module.exports = router;
