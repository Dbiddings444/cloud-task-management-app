const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authorize = require('./middleWare/authorization');
const dotenv = require("dotenv")

dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authorize.authMiddleware);

// Use the authentication routes
app.use('/', userRoutes);
app.use('/', taskRoutes);

// Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
