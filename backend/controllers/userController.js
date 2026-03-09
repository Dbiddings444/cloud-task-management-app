const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { pool } = require('../db');

dotenv.config({ path: '.env' });
const JWT_SECRET = process.env.JWT_SECRET_KEY;

async function hashPassword(password) {
	const rounds = Number(process.env.BCRYPT_ROUNDS) || 10;
	const salt = await bcrypt.genSalt(rounds);
	return bcrypt.hash(password, salt);
}
module.exports = {
	signup: async (req, res) => {
		try {
			const { name, email, password } = req.body;
			if (!email || !password) {
				return res.status(400).json({ message: 'Email and password are required' });
		}

		// Check existing user by email using Postgres
		const { rows: existing } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
		if (existing.length > 0) {
			return res.status(400).json({ message: 'Email already exists' });
		}

		const passwordHash = await hashPassword(password);
		const insertName = name || email.split('@')[0] || '';

		const insertQuery = `
			INSERT INTO users (name, email, password_hash)
			VALUES ($1, $2, $3)
			RETURNING id, email, created_at
		`;

		const { rows } = await pool.query(insertQuery, [insertName, email, passwordHash]);
		const created = rows[0];

		return res.status(201).json({ message: 'Registration successful!', user: { id: created.id, email: created.email, created_at: created.created_at } });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Error during signup' });
	}
},

login: async (req, res) => { 
    try {
        const { email, password } = req.body;
        const query1 = 'SELECT * FROM users WHERE email = $1';

        const { rows } = await pool.query(query1, [email]);
			if (rows.length === 0) {
				return res.status(400).json({ message: 'Invalid email or password' });
			}
			const user = rows[0];
			const match = await bcrypt.compare(password, user.password_hash);
			if (user && match) {
				const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
				return res.status(200).json({ message: 'Login successful', token });
			}
	return res.status(400).json({ message: 'Invalid email or password' });
} catch(err){
        console.error(err);
    	return  res.status(500).json({ error: "There was an error during login", message: err.message });
    }
},
getUsers: async (req, res) => {
	try {
		// Include name so frontend can display user-friendly assignee names
		const { rows } = await pool.query('SELECT id, name, email, created_at FROM users');
		return res.status(200).json({ users: rows });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "There was an error fetching users", message: err.message });
	}
}
}