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

document.addEventListener("DOMContentLoaded", () => {
    getRatings(); // Fetch and display ratings when the page loads
    fetchApplications();
    populateContacts();
});

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

let ratingsList = []; // To hold fetched data

async function getRatings() {
    try {
        const response = await fetch(`${DOMAIN}ratings`);
        ratingsList = await response.json(); // Parse the response as JSON
        console.log("Fetched ratings:", ratingsList); // Debugging
        populateRatings(); // Populate data after fetching
    } catch (error) {
        console.error("Error fetching ratings:", error);
    }
}

let applicationList = [];

async function fetchApplications() {
    try {
      const response = await fetch(`${DOMAIN}applications`);
      applicationList = await response.json();
      console.log("Fetched Applications:", applicationList); 
      populateApplications();
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  }
  
  let contactList = [];

async function fetchContacts() {
  try {
    const response = await fetch(`${DOMAIN}contact`);
    contactList = await response.json();
    populateContacts();
  } catch (error) {
    console.error('Error fetching contact messages:', error);
  }
}



/*const applicationList = [
    { date: '2025-01-10 UTC', name: 'Michael Maina', email: 'CLIENT', phone: '0799292048', document: 'The quick brown fox jumped over the lazy dogs.' }
];*/

function populateContacts() {
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = ''; // Clear existing content
  
    if (contactList.length === 0) {
      dataList.innerHTML = '<p>No contact messages available.</p>';
      return;
    }
  
    contactList.forEach((item, index) => {
      const listItem = document.createElement('div');
      listItem.classList.add('h-layout', 'contact-texts');
      listItem.innerHTML = `
        <p class="dat">${item.date}</p>
        <p class="name">${item.name}</p>
        <p class="email">${item.email}</p>
        <p class="phone">${item.phone}</p>
        <p class="message">${item.message}</p>
        <p class="button" onclick="viewMessage(${index})">VIEW</p>
        <p class="button orange" onclick="editContact(${index})">EDIT</p>
        <p class="button red" onclick="deleteContact(${index})">DELETE</p>
      `;
      dataList.appendChild(listItem);
    });
  }

  // Edit a contact message
async function editContact(index) {
    const contact = contactList[index];
    const name = prompt('Enter new name:', contact.name);
    const email = prompt('Enter new email:', contact.email);
    const phone = prompt('Enter new phone:', contact.phone);
    const message = prompt('Enter new message:', contact.message);
  
    if (name && email && phone && message) {
      const updatedContact = { name, email, phone, message };
  
      try {
        await fetch(`${DOMAIN}contact/${contact.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedContact),
        });
        fetchContacts(); // Refresh the contact list
      } catch (error) {
        console.error('Error updating contact:', error);
      }
    }
  }

  // Delete a contact message
async function deleteContact(index) {
    const contact = contactList[index];
    if (confirm('Are you sure you want to delete this contact message?')) {
      try {
        await fetch(`${DOMAIN}contact/${contact.id}`, {
          method: 'DELETE',
        });
        contactList.splice(index, 1); // Remove from the array
        populateContacts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  }
  
  

function populateRatings() {
    const dataList = document.getElementById('rating-list');
    dataList.innerHTML = ''; // Clear existing content

    if (ratingsList.length === 0) {
        dataList.innerHTML = '<p>No ratings available.</p>'; // Display a fallback message
        return;
    }

    ratingsList.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('h-layout', 'contact-texts'); // Add required classes
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
        dataList.appendChild(listItem); // Append the created element to the list
    });
}

// Example functions for button actions
function viewRating(index) {
    const item = ratingsList[index];
    alert(`Feedback by ${item.name}: ${item.comment}`);
}

function populateApplications() {
    const dataList = document.getElementById('application-list');
    dataList.innerHTML = ''; // Clear existing content
  
    applicationList.forEach((item, index) => {
      const listItem = document.createElement('div');
      listItem.classList.add('h-layout', 'contact-texts');
      listItem.innerHTML = `
        <p class="dat">${item.date || 'N/A'}</p>
        <p class="name">${item.name || 'N/A'}</p>
        <p class="email">${item.email || 'N/A'}</p>
        <p class="phone">${item.phone || 'N/A'}</p>
        <p class="message">${item.cv.split('/').pop() || 'N/A'}</p>
        <p class="button" onclick="viewApplicationDoc('${item.cv}')">VIEW</p>
        <p class="button red" onclick="deleteApplication(${index}, ${item.id})">DELETE</p>
      `;
      dataList.appendChild(listItem);
    });
  }
  

populateRatings();
//populateApplications();



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

function viewApplicationDoc(cvPath) {
    
    const viewDocSection = document.getElementById('doc-popup');
    const docContainer = viewDocSection.querySelector('.popup-content');
    const normalizedPath = cvPath.replace(/\\/g, '/');
    const normalized = normalizedPath.replace(/\{/g, '/');
    console.log(normalized);
    docContainer.innerHTML = `
      <iframe src="${DOMAIN}${normalized}" width="100%" height="500px" style="border: none;"></iframe>
    `;
    ///viewDocSection.style.height = '100%'; // Show the popup
    document.getElementById('doc-popup').style.display = 'flex';
    document.getElementById('doc-popup').style.height = '100%';
  }
  
  /*function closePrivacyPolicy() {
    const viewDocSection = document.getElementById('viewDoc');
    viewDocSection.style.height = '100%'; // Hide the popup
  }*/
  

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
    document.getElementById('doc-popup').style.display = 'none';
    document.getElementById('doc-popup').style.height = '0%';
}

function deleteItem(index) {
    mockData.splice(index, 1);
    populateData();
}

async function deleteApplication(index, id) {
    if (confirm('Are you sure you want to delete this application?')) {
      try {
        const response = await fetch(`${DOMAIN}applications/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete application');
        alert('Application deleted successfully');
        applicationList.splice(index, 1);
        populateApplications();
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Failed to delete the application. Please try again.');
      }
    }
  }
  


async function deleteRating(index) {
    const rating = ratingsList[index]; // Get the rating to be deleted
    if (!rating || !rating.id) {
        alert("Invalid rating selected for deletion.");
        return;
    }

    if (confirm("Are you sure you want to delete this rating?")) {
        try {
            const response = await fetch(`${DOMAIN}ratings/${rating.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete rating: ${errorText}`);
            }

            alert("Rating deleted successfully.");
            ratingsList.splice(index, 1); // Remove the item from the local array
            populateRatings(); // Refresh the displayed list
        } catch (error) {
            console.error("Error deleting rating:", error);
            alert("Failed to delete the rating. Please try again.");
        }
    }
}
