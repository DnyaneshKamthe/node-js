const { Sequelize } = require('sequelize');

//this is local connection
// const sequelize = new Sequelize('test_sql', 'root', '1234', {
//     host: 'localhost',
//     dialect: 'mysql',
// });

//this is online connection
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true, // Set to false if your cert is self-signed
                // ca: caCert, // Uncomment if using CA cert
            },
        },
    }
);

// Import models
const User = require('./user.model')(sequelize, Sequelize.DataTypes);
const TaskTracker = require('./tasktracker.model')(sequelize, Sequelize.DataTypes);

// Sync all models
sequelize.sync({ alter: true })
    .then(() => console.log("All models synced"))
    .catch(err => console.error("DB sync error:", err));

module.exports = {
    sequelize,
    User,
    TaskTracker,
};
