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
            const assignedTo = taskObject.assignee || taskObject.assignedTo || null;
            const status = taskObject.status || 'todo';
            const priority = taskObject.priority || 'low';
            const dueDate = taskObject.due_date || taskObject.dueDate || null; // expected ISO string or null

            const insertQuery = `
                INSERT INTO tasks (id, owner_id, assigned_to, title, description, status, priority, due_date)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
                RETURNING *
            `;
            console.log('assigned to:', assignedTo);
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
        try {
            const { rows } = await pool.query('SELECT * FROM tasks');
            return res.status(200).json(rows);
        } catch (err) {
            console.error('getAllTasks error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateTask: async (req, res) => {
        // Implementation for updating a task
        const taskId = req.params.id;
        console.log('Updating task:', req.params.id, 'with data:', req.body);
        try {
            const updateQuery = `
                UPDATE tasks
                SET title = $1, description = $2, status = $3, priority = $4, assigned_to = $5, due_date = $6
                WHERE id = $7 RETURNING *
            `;

            const { title, description, status, priority, due_date, assignee } = req.body;
            const { rows } = await pool.query(updateQuery, [title, description, status, priority, assignee, due_date, taskId]);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
            return res.status(200).json(rows[0]);
        } catch (err) {
            console.error('updateTask error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    deleteTask: async (req, res) => {
        // Implementation for deleting a task
        const taskId = req.params.id;
        try {
            const deleteQuery = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
            const { rows } = await pool.query(deleteQuery, [taskId]);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
            return res.status(200).json({ message: 'Task deleted successfully' });
        } catch (err) {
            console.error('deleteTask error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}