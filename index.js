// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors()); // Enables cross-origin requests from Vue
// app.use(express.json()); // Parses incoming JSON data

// // 1. Connect to MySQL Database
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',            // Leave empty if you have no password in XAMPP/WAMP
//     database: 'movie_booking_cineverse' // Replace with your actual database name in phpMyAdmin
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL database successfully!');
// });

// // 2. Test Route
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Backend server is running!',
//         status: 200
//     });
// });

// // 3. Example API Route (Fetch data from MySQL to show in Vue)
// // Add this inside your server/index.js file
// app.get('/api/users', (req, res) => {
//     const query = 'SELECT * FROM users'; // Make sure you have a 'users' table in MySQL
    
//     db.query(query, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });

// // Start Server
// const port = 8082;
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });