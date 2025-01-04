const mysql = require('mysql');
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

    const createDbQuery = 'CREATE DATABASE IF NOT EXISTS userdb';
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
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
    feedback TEXT NULL default ' ',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

// Create database and tables
    db.query(createDbQuery, (err) => {
        if (err) throw err;
        console.log('Database created or already exists.');

        db.changeUser({ database: 'elixir_salon' }, (err) => {
            if (err) throw err;
            console.log('Changed to database elixir_salon');

            // Create users table
            db.query(createTableQuery, (err) => {
                if (err) throw err;
                console.log('Table created or already exists.', err);
            });

            // Create ratings table
            db.query(createTableRatings, (err) => {
                if (err) throw err;
                console.error('Table creation failed:', err);
            });
            db.end();
        });
    });
});