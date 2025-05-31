const { TaskTracker } = require('../models');

// Create Task
const createTask = async (req, res) => {
    try {
        const task = await TaskTracker.create(req.body);
        res.status(201).json({ message: 'Task created', task });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskTracker.findAll();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get single task by id
const getTaskById = async (req, res) => {
    try {
        const task = await TaskTracker.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update task by id
const updateTask = async (req, res) => {
    try {
        const [updated] = await TaskTracker.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) return res.status(404).json({ message: 'Task not found' });
        const updatedTask = await TaskTracker.findByPk(req.params.id);
        res.json({ message: 'Task updated', updatedTask });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete task by id
const deleteTask = async (req, res) => {
    try {
        const deleted = await TaskTracker.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
