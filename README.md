
---

# Elixil Salon and Spur

Elixil Salon and Spur is a web application designed to offer a modern, elegant, and user-friendly online presence for a salon and spa. The website enables users to explore services, make bookings, and interact with the salon’s offerings conveniently.

**Website URL:** [www.elixirsalonandspa.co.ke](https://www.elixirsalonandspa.co.ke)

### Figma Design Mockups:
The designs for the site are available in the Figma file:
[View Design on Figma](https://www.figma.com/design/heA8uBM3GA2b8BM2yEMC1t/ELIXIL-SITE?node-id=2006-3&t=E940hXaPLOyrNzgL-1)

---

## Tech Stack

This project is built using the following technologies:

- **Frontend:** 
  - HTML
  - CSS (for styling)
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js (for creating the server and API routes)
  - MySQL DB (for storing data such as user information and service details)

---

## Features

- **Responsive Design:** Optimized for both desktop and mobile views, ensuring a smooth experience on all devices.
- **Service Booking Integration with Fresha:** Bookings are seamlessly managed through the Fresha platform, allowing users to schedule appointments directly.
- **User Registration & Login:** Secure user accounts for customers to manage their appointments.
- **Salon Gallery:** A collection of images showcasing the salon’s facilities and services.
- **Admin Panel:** For the salon’s staff to manage services, users, and appointments.

---

## Fresha Booking Integration

The website is integrated with **Fresha**, a leading booking and management platform for salons and spas. This allows customers to easily view services and book their appointments directly through the Fresha platform.

- Customers can explore a wide range of salon and spa services.
- Users can select their desired services and schedule an appointment in real-time via the Fresha booking system.
- The Fresha integration ensures that appointments are automatically updated and managed, providing a seamless experience for both the customers and the salon staff.

You can manage bookings by visiting the booking page and interacting with the embedded Fresha booking interface.

---

## Getting Started

To get a local copy of the project running on your machine, follow these simple steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (You can also use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud-based databases)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/michaelmungaimaina/elixir-salon-spur
   ```

2. **Navigate to the project directory:**
   ```bash
   cd elixir-salon-spur
   ```

3. **Install dependencies:**
   Install all the necessary packages by running:
   ```bash
   npm install
   ```

4. **Setup MongoDB:**
   If you're running a local MongoDB instance, make sure it's up and running. Alternatively, you can configure your MongoDB Atlas database and add the connection string in your environment variables.

5. **Start the server:**
   After setting up MongoDB, you can start the development server with:
   ```bash
   npm start
   ```

6. **Access the application:**
   The website will be available at `http://localhost:3000` in your browser.

---

## Project Structure

The repository is organized as follows:

```
/elixir-salon-spur/
│
├── public/                    # Frontend files
│   ├── index.html             # Main HTML file
│   ├── styles.css             # CSS file
│   ├── easy.css               # CSS file (Inherited Classes)
│   ├── script.js              # Frontend JavaScript
│
├── server/                    # Backend files
│   ├── server.js              # Express server file
│   ├── config.js              # Configuration file for MySQL and Nodemailer
│   ├── setupDatabase.js       # Script to initialize MySQL database and table
│
├── node_modules/              # Installed dependencies (auto-generated)
├── .env                       # Environment variables
├── nodemon.json               # Nodemon configuration file
├── package.json               # Node.js package configuration
├── package-lock.json          # Auto-generated dependency lock file
├── README.md                  # Documentation (optional)

```

---

## Contributing

If you'd like to contribute to the project, feel free to fork the repository, create a branch, and submit a pull request. Please ensure that your code follows the existing structure and passes all tests.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a pull request.

---

## Author

- **Michael Maina**
- GitHub: [michaelmungaimaina](https://github.com/michaelmungaimaina)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
