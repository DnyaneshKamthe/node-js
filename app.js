const express = require("express");
const app = express();
require("dotenv").config();

const { sequelize } = require('./models'); // ✅ Sequelize import from models/index.js
const authRoutes = require('./routes/authRoutes');
const taskTrackerRoutes = require('./routes/taskTrackerRoutes');


const PORT = process.env.PORT || 8000;
// Middleware to parse JSON body
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskTrackerRoutes);

// Test Sequelize DB connection
sequelize.authenticate()
    .then(() => console.log('Sequelize connected to MySQL'))
    .catch((err) => console.error('Unable to connect to MySQL with Sequelize:', err));

app.get('/', (req, res) => {
    res.send('Sequelize is connected!');
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

module.exports = app; 
