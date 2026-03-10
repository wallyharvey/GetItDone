/* ============================================
   FILE: taskRoutes.js
   PURPOSE: CRUD routes for tasks
   ENDPOINTS: /api/tasks
   ============================================ */

const express = require('express');
const router = express.Router();
const Task = require('../models/task');


// -------------------- GET ALL TASKS --------------------
// GET /api/tasks
// Returns every task in the database, sorted newest first
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ dateCreated: -1 });
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Server error fetching tasks' });
    }
});


// -------------------- GET SINGLE TASK --------------------
// GET /api/tasks/:id
// Returns one task by its MongoDB _id
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        console.error('Error fetching task:', err);
        res.status(500).json({ message: 'Server error fetching task' });
    }
});


// -------------------- CREATE TASK --------------------
// POST /api/tasks
// Creates a new task and saves it to the database
router.post('/', async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        // Create a new task using the Mongoose model
        const newTask = new Task({
            title,
            description,
            dueDate
        });

        // Save it to MongoDB
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(400).json({ message: 'Error creating task', error: err.message });
    }
});


// -------------------- UPDATE TASK --------------------
// PUT /api/tasks/:id
// Updates any fields on an existing task
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(400).json({ message: 'Error updating task', error: err.message });
    }
});


// -------------------- DELETE TASK --------------------
// DELETE /api/tasks/:id
// Removes a task from the database permanently
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted', task: deletedTask });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: 'Server error deleting task' });
    }
});


module.exports = router;
