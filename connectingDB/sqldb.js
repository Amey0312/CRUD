const mysql = require('mysql2/promise');

// Create a database connection pool
const pool = mysql.createPool({
    host: 'localhost',    // Database host
    user: 'root',         // MySQL username
    password: '',         // MySQL root password (leave blank if none)
    database: 'demo',   // Your database name
    waitForConnections: true,
    connectionLimit: 10,  // Maximum number of connections in the pool
    queueLimit: 0,
});


// Export the pool
module.exports = pool;