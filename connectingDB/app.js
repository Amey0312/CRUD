const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./sqldb.js');
const contentRoutes = require('./controller/contentController.js');
const app = express();
const port = 3000;



async function testConnection() {   // Test the database connection
    let connection;
    try {
        // Acquire a connection
        connection = await pool.getConnection();
        console.log('Connected to the database successfully!');

        // Perform any test query (optional)
        const [rows] = await connection.query('SELECT 1 + 1 AS result');
        console.log('Test query result:', rows);     

    } catch (err) {
        console.error('Database connection failed:', err.message);
    } finally {
        // Ensure connection is released back to the pool
        if (connection) connection.release();
    }
}
   
app.use(bodyParser.json());
//routes
app.use('/api/content', contentRoutes );

//error handler
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(err.status || 404).send('Sorry cant find that!');
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    testConnection();
});