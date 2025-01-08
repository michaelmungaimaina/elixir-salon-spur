//const { json } = require("body-parser");

console.log('Admin.js - Loaded');
let DOMAIN_NAME = 'http://127.0.0.1:3000/';
let API_PATH = 'api/';
const DOMAIN = `${DOMAIN_NAME}${API_PATH}`;

const logInPage = document.getElementById('login-page');
const dashboard = document.getElementById('dashboard');
const navBar = document.getElementById('nav-bar');
const mediaPage = document.getElementById('media');
const contactPage = document.getElementById('contact');
const contactBar = document.getElementById('contact-bar');
const ratingBar = document.getElementById('rating-bar');
const ratingPage = document.getElementById('ratings');
const applicationPage = document.getElementById('applications');

let feedbackIndex = 0;

async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    auth = { username, password };

    const response = await fetch(`${DOMAIN}auth`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
    });

    console.log(`${JSON.stringify(auth)}`);

    if (response.ok) {
        alert('Login Successful!.');
        document.getElementById('nav-bar').style.display = 'block';
        //document.getElementById('login-page').style.width = '100%'
        document.getElementById('dashboard').style.display = 'flex'
        document.getElementById('login-page').style.display = 'none';
        //document.getElementById('dashboard').classList.remove('hidden');
    } else {
        alert('Invalid username or password.');
    }
}

/*function navigateTo(section) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
}*/

function navigateToContactPage() {
    contactPage.style.display = 'flex';
    ratingPage.style.display = 'none';
    applicationPage.style.display = 'none';
    mediaPage.style.display = 'none';

}

function navigateToRatingstPage() {
    contactPage.style.display = 'none';
    ratingPage.style.display = 'flex';
    applicationPage.style.display = 'none';
    mediaPage.style.display = 'none';

}

function navigateToApplicationsPage() {
    contactPage.style.display = 'none';
    ratingPage.style.display = 'none';
    applicationPage.style.display = 'flex';
    mediaPage.style.display = 'none';

}

function navigateToMedia() {
    contactPage.style.display = 'none';
    ratingPage.style.display = 'none';
    applicationPage.style.display = 'none';
    mediaPage.style.display = 'flex';

}
/**
 * 
 */
async function fetchUsers() {
    const url = "http://localhost:3000/users";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const users = await response.json();
        console.log("Fetched users:", users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
    }
}

/**
 * Adds a new user to the system.
 * 
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */
async function addUser(name, email, password) {
    const url = "http://localhost:3000/users";

    const data = { name, email, password };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log("User added successfully:", result);
    } catch (error) {
        console.error("Error adding user:", error.message);
    }
}

const mockData = [
    { date: '2025-01-10 UTC', name: 'Michael Maina', email: 'pantalemonmongah@gmail.com', phone: '0799292048', message: 'The quick brown fox jumped over the lazy dogs.' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed disappointed Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-11 UTC', name: 'Jane Smith', email: 'jane@example.com', phone: '0799234567', message: 'Hello from Jane!' },
    { date: '2025-01-12 UTC', name: 'Sam Wilson', email: 'sam@example.com', phone: '0799876543', message: 'Checking in, this is Sam.' }
];
let ratingsList = [];
async function getRatings() {
    try {
        const response = await fetch(`${DOMAIN}ratings`);
        ratingsList = await response.json(); // Store the fetched data in ratingsList
        console.log("Fetched ratings:", ratingsList); // Check the data
        populateRatings(); // Populate the data once fetched
    } catch (error) {
        console.error("Error fetching ratings:", error);
    }
}
/*const ratingsList = [
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '3' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'CLIENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '4' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'AGENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '1' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'CLIENT', comment: 'The quick brown fox jumped over the lazy dogs.', star: '5' },
    { date: '2025-01-10 UTC', name: 'Michael Maina', type: 'CUSTOMER', comment: 'The quick brown fox jumped over the lazy dogs.', star: '2' }
];*/

const applicationList = [
    { date: '2025-01-10 UTC', name: 'Michael Maina', email: 'CLIENT', phone: '0799292048', document: 'The quick brown fox jumped over the lazy dogs.' }
];

function populateData() {
    const dataList = document.getElementById('data-list');
    //dataList.innerHTML = '';
    mockData.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('h-layout', 'contact-texts');
        listItem.innerHTML = `
            <p class="dat">${item.date}</p>
            <p class="name">${item.name}</p>
            <p class="email">${item.email}</p>
            <p class="phone">${item.phone}</p>
            <p class="message">${item.message}</p>
            <p class="button" onclick="viewMessage(${index})">VIEW</p>
            <p class="button red" onclick="deleteItem(${index})">DELETE</p>
        `;
        dataList.appendChild(listItem);
    });
}

populateData();

function populateRatings() {
    const dataList = document.getElementById('rating-list');
    dataList.innerHTML = ''; // Clear the existing content

    ratingsList.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('h-layout', 'contact-texts');
        listItem.innerHTML = `
            <p class="dat">${item.created_at || "N/A"}</p>
            <p class="name">${item.name || "N/A"}</p>
            <p class="type">${item.type || "N/A"}</p>
            <p class="message">${item.comment || "N/A"}</p>
            <p class="phone">${item.star || "N/A"}</p>
            <p class="button" onclick="viewRating(${index})">FEEDBACK</p>
            <p class="button orange" onclick="viewComment(${index})">VIEW</p>
            <p class="button red" onclick="deleteRating(${index})">DELETE</p>
        `;
        dataList.appendChild(listItem);
    });
}

// Example functions for button actions
function viewRating(index) {
    const item = ratingsList[index];
    alert(`Feedback by ${item.name}: ${item.comment}`);
}

function populateApplications() {
    const dataList = document.getElementById('application-list');
    //dataList.innerHTML = '';
    applicationList.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('h-layout', 'contact-texts');
        listItem.innerHTML = `
            <p class="dat">${item.date}</p>
            <p class="name">${item.name}</p>
            <p class="email">${item.email}</p>
            <p class="phone">${item.phone}</p>
            <p class="message">${item.document}</p>
            <p class="button" onclick="viewApplicationDoc(${index})">VIEW</p>
            <p class="button red" onclick="deleteApplication(${index})">DELETE</p>
        `;
        dataList.appendChild(listItem);
    });
}
populateRatings();
populateApplications();


function viewMessage(index) {
    const message = mockData[index].message;
    document.getElementById('popup-message').textContent = message;
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('popup').style.height = '100%';
}

function viewComment(index) {
    const message = ratingsList[index].comment;
    document.getElementById('popup-message').textContent = message;
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('popup').style.height = '100%';
}
function viewRating(index) {
    feedbackIndex = index;
    const message = ratingsList[index].message;
    document.getElementById('input-message').textContent = message;
    document.getElementById('input-popup').style.display = 'flex';
    document.getElementById('input-popup').style.height = '100%';
}

function viewApplicationDoc(index) {
    const message = applicationList[index].message;
    document.getElementById('input-message').textContent = message;
    document.getElementById('input-popup').style.display = 'flex';
    document.getElementById('input-popup').style.height = '100%';
}

function submitFeedback() {
    // feedback update
    //index = feedbackIndex


    populateRatings
}

function closePopup() {
    document.getElementById('popup').style.height = '0%';
    document.getElementById('popup').style.display = 'none';
    document.getElementById('input-popup').style.height = '0%';
    document.getElementById('input-popup').style.display = 'none';
}

function deleteItem(index) {
    mockData.splice(index, 1);
    populateData();
}
function deleteRating(index) {
    ratingsList.splice(index, 1);
    populateRatings();
}

function deleteApplication(index) {
    applicationList.splice(index, 1);
    populateApplications();
}