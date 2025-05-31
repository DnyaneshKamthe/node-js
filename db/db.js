const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', // Or your MySQL server address
    user: 'root',  // Your MySQL username
    password: '1234', // Your MySQL password
    database: 'test_sql' // Your MySQL database name
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


module.exports = { connection };