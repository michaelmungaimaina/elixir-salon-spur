const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
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
db
.connect((err) => {
  if (err) {
    console.error('Error Connecting to Database ', err);
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
  const { name, email, password } = req.body;

  // Insert data into MySQL
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.status(201).send('User data saved sent');
  });
});

// API endpoint for user authentication
app.post("/api/auth", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const query = "SELECT * FROM users WHERE name = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      /* Store user data in the session
      req.session.user = {
        id: results[0].id,
        username: results[0].username,
      };**/

      return res.status(200).json({ message: "Login successful", /*user: req.session.user*/ });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  });
});

// Endpoint to fetch all users
app.get("/api/users", (req, res) => {
  const fetchQuery = `SELECT id, name, email, password, created_at FROM users`;

  db.query(fetchQuery, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Failed to fetch users" });
    }

    res.status(200).json(results);
  });
});


app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  // Validate input data
  if (!name || !email || !phone || !message) {
    return res.status(400).send('All fields are required');
  }
  // Prepare the SQL query to insert the data into the contact_data table
  const query = `
    INSERT INTO contact_data (name, email, phone, message) 
    VALUES (?, ?, ?, ?)
  `;
  // Execute the query
  db.query(query, [name, email, phone, message], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    // Send Confirmation Email
    sendWelcomeEmail(name.trim().split(' ')[0],email);
    // Send a success response
    res.status(201).send('Contact data submitted successfully');
  });
});

/**
 * Send a welcome email to the client after filling contact form
 * @param {string} clientName - Name of the client
 * @param {string} clientEmail - Email of the client
 */
async function sendWelcomeEmail(clientName, clientEmail) {
  const mailOptions = {
      from: `"Elixir Salon & Spa" <${process.env.EMAIL_USER}>`, // Sender email
      to: clientEmail, // Recipient email
      subject: 'Welcome to Elixir Salon & Spa - Pamper, Relax, Renew',
      html: `
         <body style="font-family: Arial, sans-serif; color: #fff; padding: 20px">
    <div style="
      max-width: 800px;
      margin: 0 auto;
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 10px;
    ">
    <div  style="
      max-width: 600px;
      margin: 0 auto;
      padding: 20px 100px;
      background-color: rgba(21, 39, 13, 0.8);
      border-radius: 10px;
    ">
        <p style="line-height: 1.5;">
            Hi <span style="font-weight: bold;">${clientName},</span>,
        </p>
        <p style="line-height: 1.5;">
            Thank you for contacting us at <a href="https://elixirsalonandspa.co.ke" style="color: #FFD700;
            font-weight: bold;
            font-size: large;
            transition: color 0.3s ease;
            text-decoration: none;">Elixir Salon & Spa!</a> <br>
            <br>
            We’ve received your message and will get back to you within 24 hours. Your inquiries and feedback are important to us, and we’re here to assist you.
        </p>
        <p style="line-height: 1.5;">In the meantime, feel free to explore:</p>
        <ul>
            <li style="list-style: none;">
                Our <a href="https://elixirsalonandspa.co.ke/#sectionOurServices" style="color: #FFD700;
                font-weight: bold;
                font-size: large;
                transition: color 0.3s ease;
                text-decoration: none;">Services.</a>
            </li>
            <li style="list-style: none;">
                Available <a href="https://elixirsalonandspa.co.ke/#sectionWorkWithUs" style="color: #FFD700;
                font-weight: bold;
                font-size: large;
                transition: color 0.3s ease;
                text-decoration: none;">Opportunities.</a>
            </li>
        </ul>
        <p style="line-height: 1.5;">We’re here to take the complexity out of beauty for you; by <b style="color: goldenrod; font-size: 16px;">Pampering</b>, <b style="color: goldenrod; font-size: 16px;">Relaxing</b> and <b style="color: goldenrod; font-size: 16px;">Renewing</b> your self.</p>
        <p style="line-height: 1.5;">
            <a href="https://bit.ly/elixirsalonandspaBooking" style="display: inline-block;
            padding: 5px 30px;
            background: linear-gradient(90deg, #B07614, #B07614, #B07614);
            color: white;
            font-weight: bold;
            text-align: center;
            border-radius: 8px;
            text-decoration: none;
            transition: background 0.3s ease;">
                Book an Appointment
            </a>
        </p style="line-height: 1.5;">
        <p style="line-height: 1.5;">We’re excited to connect with you soon!</p>
        <p style="line-height: 1.5;">Warm regards,<br /></p>
        <p style="line-height: 1.5;">
            <br />
            <a href="https://elixirsalonandspa.co.ke" style="color: #FFD700;
        text-decoration: none; font-weight: bolder;">The Elixir Salon & Spa Team</a><br />
            Commodore Office Suites,<br>
            Kindaruma Road, Nairobi County <br>
            Phone: 0717 733 000 / 07 77 733 004 <br>
            Email: info@elixirsalonandspa.co.ke
        </p>
        <footer style="text-align: center;
        margin-top: 30px;
        color: #fff;
        font-size: 14px;">
            <p style="font-size: x-large; font-weight: bolder; color: #6d6d6d">
                Powered By <br /><a href="https://elixirsalonandspa.co.ke" 
                style="color: #FFD700;
                font-weight: bold;
                text-decoration: none;
                font-size: large;
                transition: color 0.3s ease;
                text-decoration: none;
                line-height: 5em;
                margin-bottom: -50px;">Elixir Salon & Spa</a>
            </p>
            <p style="line-height: 1.5;">
                <a href="https://adconnect.co.ke/unsubscribe" style="color: #f65730;
                text-decoration: none;
                margin-top: -10px;"></a>
            </p>
        </footer>
    </div>
    </div>
</body>
    `,
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully!');
  } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
  }
}

async function sendWorkApplicationConfirmationEmail(clientName, clientEmail) {
  const mailOptions = {
      from: `"Elixir Salon & Spa" <${process.env.EMAIL_USER}>`, // Sender email
      to: clientEmail, // Recipient email
      subject: 'Job Application Receipt',
      html: `
         <body style="font-family: Arial, sans-serif; color: #fff; padding: 20px">
    <div style="
      max-width: 800px;
      margin: 0 auto;
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 10px;
    ">
        <div style="
      max-width: 800px;
      margin: 0 auto;
      padding: 20px 100px;
      background-color: rgba(21, 39, 13, 0.8);
      border-radius: 10px;
    ">
            <p style="line-height: 1.5;">
                Hello <span style="font-weight: bold;">${clientName},</span>,
            </p>
            <p style="line-height: 1.5;">
                Thank you for your interest in employment at <a href="https://elixirsalonandspa.co.ke" style="color: #FFD700;
            font-weight: bold;
            font-size: large;
            transition: color 0.3s ease;
            text-decoration: none;
            text-align: justify;">Elixir Salon & Spa!</a>
                We are excited to meet you.
                <br>
                <br>
                Our team will review your application and if there is a strong alignment 
                with the position, we will schedule a call to get to know you better and to 
                answer any questions you have about <a href="https://elixirsalonandspa.co.ke" style="color: #FFD700;
                font-weight: bold;
                font-size: large;
                transition: color 0.3s ease;
                text-decoration: none;">Elixir Salon & Spa</a> and the role. <br>
                <p style="line-height: 1.5; text-align: justify;">
                    We know that putting together a resume and application is a lot of work. We will give each a thoughtful consideration.
                    We appreciate your patience through this process.
                </p>
            </p style="line-height: 1.5;">
            <p style="line-height: 1.5;">Should you have any questions, do not hesitate to contact us!</p>
            <p style="line-height: 1.5;">Warm regards,<br /></p>
            <p style="line-height: 1.5;">
                <br />
                <a href="https://elixirsalonandspa.co.ke" style="color: #FFD700;
        text-decoration: none; font-weight: bolder;">The Elixir Salon & Spa Team</a><br />
                Commodore Office Suites,<br>
                Kindaruma Road, Nairobi County <br>
                Phone: 0717 733 000 / 07 77 733 004 <br>
                Email: info@elixirsalonandspa.co.ke
            </p>
            <footer style="text-align: center;
        margin-top: 30px;
        color: #fff;
        font-size: 14px;">
                <p style="font-size: x-large; font-weight: bolder; color: #6d6d6d">
                    Powered By <br /><a href="https://elixirsalonandspa.co.ke" style="color: #FFD700;
                font-weight: bold;
                text-decoration: none;
                font-size: large;
                transition: color 0.3s ease;
                text-decoration: none;
                line-height: 5em;
                margin-bottom: -50px;">Elixir Salon & Spa</a>
                </p>
                <p style="line-height: 1.5;">
                    <a href="https://adconnect.co.ke/unsubscribe" style="color: #f65730;
                text-decoration: none;
                margin-top: -10px;"></a>
                </p>
            </footer>
        </div>
    </div>
</body>
    `,
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully!');
  } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
  }
}

// Send a welcome email to the client
app.post('/api/send-contact-email', async (req, res) => {
  const { clientName, clientEmail } = req.body;

  if (!clientName || !clientEmail) {
      console.log('Client name and email are required');
      return res.status(400).json({ error: 'Client name and email are required' });
  }

  try {
      console.log(req.body);
      await sendWelcomeEmail(clientName, clientEmail);
      console.log('Welcome email sent successfully');
      res.status(200).json({ message: 'Welcome email sent successfully' });
  } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({ error: 'Failed to send email' });
  }
});

// Send a welcome email to the client
app.post('/api/application-email', async (req, res) => {
  const { clientName, clientEmail } = req.body;

  if (!clientName || !clientEmail) {
      console.log('Client name and email are required');
      return res.status(400).json({ error: 'Client name and email are required' });
  }

  try {
      console.log(req.body);
      await sendWorkApplicationConfirmationEmail(clientName, clientEmail);
      console.log('Welcome email sent successfully');
      res.status(200).json({ message: 'Welcome email sent successfully' });
  } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({ error: 'Failed to send email' });
  }
});

// API to add a new rating
app.post('/api/ratings', (req, res) => {
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
app.get('/api/ratings', (req, res) => {
    db.query('SELECT * FROM ratings', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results.map(row => new Rating(row.client_name, row.client_email, row.client_phone, row.client_type, row.comment, row.stars, row.feedback, row.created_at)));
    });
});

// Delete a specific rating by ID
app.delete('/api/ratings/:id', (req, res) => {
  const ratingId = req.params.id;
  db.query('DELETE FROM ratings WHERE id = ?', [ratingId], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error deleting rating');
      }
      if (result.affectedRows === 0) {
          return res.status(404).send('Rating not found');
      }
      res.status(200).send('Rating deleted successfully');
  });
});
// Multer Configuration for File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

//
app.post('/api/applications', upload.single('cv'), (req, res) => {
  const { name, email, phone } = req.body;
  const cvPath = req.file.path;

  const query = 'INSERT INTO applications (name, email, phone, cv) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, phone, cvPath], (err) => {
      if (err) return res.status(500).send(err);

      // Send Confirmation Email
      sendWorkApplicationConfirmationEmail(name.trim().split(' ')[0],email);
      res.status(200).send('Application submitted and Confirmation Sent successfully!');
  });
});

app.get('/api/applications', (req, res) => {
  const query = 'SELECT * FROM applications';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

app.delete('/api/applications/:id', (req, res) => {
  const { id } = req.params;

  // Fetch the CV path to delete the file from storage
  const selectQuery = 'SELECT cv FROM applications WHERE id = ?';
  db.query(selectQuery, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Application not found');

    const cvPath = results[0].cv;

    // Delete the application from the database
    const deleteQuery = 'DELETE FROM applications WHERE id = ?';
    db.query(deleteQuery, [id], (err) => {
      if (err) return res.status(500).send(err);

      // Delete the file from storage
      fs.unlink(cvPath, (err) => {
        if (err) console.error(`Error deleting file: ${cvPath}`, err);
      });

      res.status(200).send('Application deleted successfully');
    });
  });
});


app.put('/api/applications/:id', upload.single('cv'), (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const newCvPath = req.file ? req.file.path : null;

  // Fetch the current CV path to delete if a new CV is uploaded
  const selectQuery = 'SELECT cv FROM applications WHERE id = ?';
  db.query(selectQuery, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Application not found');

    const oldCvPath = results[0].cv;

    // Update the database
    const updateQuery = newCvPath
      ? 'UPDATE applications SET name = ?, email = ?, phone = ?, cv = ? WHERE id = ?'
      : 'UPDATE applications SET name = ?, email = ?, phone = ? WHERE id = ?';

    const queryParams = newCvPath
      ? [name, email, phone, newCvPath, id]
      : [name, email, phone, id];

    db.query(updateQuery, queryParams, (err) => {
      if (err) return res.status(500).send(err);

      // Delete the old CV if a new one is uploaded
      if (newCvPath) {
        fs.unlink(oldCvPath, (err) => {
          if (err) console.error(`Error deleting file: ${oldCvPath}`, err);
        });
      }

      res.status(200).send('Application updated successfully');
    });
  });
});


// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
