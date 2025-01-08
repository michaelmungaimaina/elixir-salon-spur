const mysql = require('mysql2');
const config = require('./config');

// Debug the config
console.log("Database config:", config.db);

if (!config.db) {
    console.error("Database configuration is missing.");
    process.exit(1);
}

const db = mysql.createConnection(config.db);

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');

    const createDbQuery = 'CREATE DATABASE IF NOT EXISTS elixir_salon';
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  // Create Contact info:
    const createContactData = `
    CREATE TABLE IF NOT EXISTS contact_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;

    // Create ratings table SQL query
    const createTableRatings = `
CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    client_type VARCHAR(50) NOT NULL,
    comment TEXT NOT NULL,
    stars INT NOT NULL,
    feedback TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

    const createTableApplications =
        `CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    cv VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

    // Create database and tables
    db.query(createDbQuery, (err) => {
        if (err) {
            console.error('Error creating database:', {
                message: err.message,
                code: err.code,
                stack: err.stack,
            });
            return;
        }
        console.log('Database created or already exists.');

        db.changeUser({ database: 'elixir_salon' }, (err) => {
            if (err) {
                console.error('Error switching to database "elixir_salon":', {
                    message: err.message,
                    code: err.code,
                    stack: err.stack,
                });
                return;
            }
            console.log('Switched to database "elixir_salon".');

            // Helper function to execute and debug queries
            const executeQuery = (query, description) => {
                db.query(query, (err, results) => {
                    if (err) {
                        console.error(`Error executing query for ${description}:`, {
                            query,
                            message: err.message,
                            code: err.code,
                            stack: err.stack,
                        });
                    } else {
                        console.log(`${description} executed successfully.`);
                    }
                });
            };

            // Create users table
            executeQuery(createTableQuery, 'users table');

            // Create ratings table
            executeQuery(createTableRatings, 'ratings table');

            // Create applications table
            executeQuery(createTableApplications, 'applications table');
            
            // Create applications table
            executeQuery(createContactData, 'Contact-Data table');

            // Close the database connection
            db.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', {
                        message: err.message,
                        code: err.code,
                        stack: err.stack,
                    });
                } else {
                    console.log('Database connection closed.');
                }
            });
        });
    });
});