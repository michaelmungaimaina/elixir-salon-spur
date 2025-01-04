const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const config = require('./config');
const Rating = require('../public/models/RatingModel');

const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection(config.db);
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: config.mail.service,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

// API Endpoints
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  // Insert data into MySQL
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }

    // Send notification email
    const adminMailOptions = {
      from: config.mail.user,
      to: 'admin@example.com', // Replace with your admin email
      subject: `New User Data Shared`,
      text: `User ${name} (${email}) has shared their data.`,
    };

    const userMailOptions = {
      from: config.mail.user,
      to: email,
      subject: 'Thank you for sharing your data',
      text: `Hi ${name},\n\nThank you for sharing your data with us.\n\nBest regards,\nYour Team`,
    };

    transporter.sendMail(adminMailOptions, (err) => {
      if (err) console.error('Error sending admin email:', err);
    });

    transporter.sendMail(userMailOptions, (err) => {
      if (err) console.error('Error sending user email:', err);
    });

    res.status(201).send('User data saved and emails sent');
  });
});

// API to add a new rating
app.post('/ratings', (req, res) => {
    const { clientName, clientEmail, clientPhone, clientType, comment, stars, feedback } = req.body;
    const rating = new Rating(clientName, clientEmail, clientPhone, clientType, comment, stars, feedback);
    const query = 'INSERT INTO ratings (client_name, client_email, client_phone, client_type, comment, stars, feedback) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [
        rating.getClientName(),
        rating.getClientEmail(),
        rating.getClientPhone(),
        rating.getClientType(),
        rating.getComment(),
        rating.getStars(),
        rating.getFeedback()
    ], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId });
    });
});

// API to get all ratings
app.get('/ratings', (req, res) => {
    db.query('SELECT * FROM ratings', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results.map(row => new Rating(row.client_name, row.client_email, row.client_phone, row.client_type, row.comment, row.stars, row.feedback, row.created_at)));
    });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
