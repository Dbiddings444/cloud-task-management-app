const { pool } = require('../db');
const crypto = require('crypto');

module.exports = {
    createTask: async (req, res) => {
        try {
            // Accept either JSON body or a stringified `task` field (form-data)
            let taskObject = null;
            if (req.body.task) {
                // task may be JSON string
                if (typeof req.body.task === 'string') {
                    taskObject = JSON.parse(req.body.task);
                } else {
                    taskObject = req.body.task;
                }
            } else {
                taskObject = req.body;
            }

            // Basic authentication requirement: owner (from middleware)
            const ownerId = req.user && (req.user.id || req.user.email) ? (req.user.id || req.user.email) : null;
            if (!ownerId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // Validate required fields
            if (!taskObject || !taskObject.title || !taskObject.description) {
                return res.status(400).json({ error: 'Title and description are required' });
            }

            const id = crypto.randomUUID();
            const assignedTo = taskObject.assigned_to || taskObject.assignedTo || null;
            const status = taskObject.status || 'todo';
            const priority = taskObject.priority || 'low';
            const dueDate = taskObject.due_date || taskObject.dueDate || null; // expected ISO string or null

            const insertQuery = `
                INSERT INTO tasks (id, owner_id, assigned_to, title, description, status, priority, due_date)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
                RETURNING *
            `;

            const params = [id, ownerId, assignedTo, taskObject.title, taskObject.description, status, priority, dueDate];
            const { rows } = await pool.query(insertQuery, params);
            const created = rows[0];
            return res.status(201).json(created);
        } catch (err) {
            console.error('createTask error:', err);
            return res.status(400).json({ error: 'Invalid task data' });
        }
    },
    getAllTasks: async (req, res) => {
        // Implementation for getting all tasks
    },
    getSingleTask: async (req, res) => {
        // Implementation for getting a single task
    },
    updateTask: async (req, res) => {
        // Implementation for updating a task
    },
    deleteTask: async (req, res) => {
        // Implementation for deleting a task
    }
}