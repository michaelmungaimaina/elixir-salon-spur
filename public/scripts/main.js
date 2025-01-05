console.log('main.js - Loaded');

// Component initialization
const serviceList = document.getElementById('serviceList');
const sectionHome = document.getElementById('sectionHome');

const sectionPrivacyPolicy = document.getElementById('privacyPolicy');
const btnClosePrivacyPolicy = document.getElementById('btnClosePrivacyPolicy');
const sectionWorkApplicationOverlay = document.getElementById('workPopupOverlay');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(?:\+254|0)(7|1)\d{8}$/;
const twoWordsPattern = /^\S+\s+\S+/;

document.addEventListener("DOMContentLoaded", () => {
    const serviceList = document.querySelectorAll(".service-card .list-item");
    const delay = 300; // Delay between items (in milliseconds)

    serviceList.forEach((item, index) => {
        setTimeout(() => {
            item.classList.remove("hidden");
            item.classList.add("visible");
        }, index * delay);
    });

    const wrapper = document.querySelector("#sectionTestimonial .testimonial-scroll-wrapper");
    const container = document.querySelector("#sectionTestimonial .testimonial-container");

    // Duplicate content for infinite scrolling
    const clone = wrapper.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = `${wrapper.scrollWidth}px`; // Place it after the original content
    container.appendChild(clone);

    // Continuous scroll function
    function continuousScroll() {
        const wrapperWidth = wrapper.scrollWidth;

        // Move the wrapper
        wrapper.style.transform = `translateX(${-wrapperWidth}px)`;
        wrapper.style.transition = `transform 20s linear`;

        // Move the clone after the wrapper scroll completes
        clone.style.transform = `translateX(${-wrapperWidth}px)`;
        clone.style.transition = `transform 20s linear`;

        // Reset position after transition ends
        setTimeout(() => {
            wrapper.style.transition = "none";
            clone.style.transition = "none";
            wrapper.style.transform = `translateX(0)`;
            clone.style.transform = `translateX(0)`;

            continuousScroll(); // Restart scroll
        }, 20000); // Match the transition duration
    }

    // Start the scroll
    continuousScroll();
});

const bookingSection = this.document.getElementById('sectionBooking')

function scrollToSection() {
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

scrollToSection(bookingSection);

// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Show the popup if the URL parameter `{}=true` is present
window.onload = function () {
    const privacyPolicy = getUrlParameter('privacy-policy');
    const workAplication = getUrlParameter('apply-for-work');

    if (privacyPolicy === 'true') openPrivacyPolicy();
    if (workAplication === 'true') openApplicationForm();
};

function openPrivacyPolicy() {
    if (sectionPrivacyPolicy) {
        sectionPrivacyPolicy.style.height = '100%';
        const newUrl = `${baseUrl.slice(0, 0)}?privacy-policy=true`;
        window.history.pushState({}, '', newUrl);
    }
}
function closePrivacyPolicy() {
    if (sectionPrivacyPolicy) {
        sectionPrivacyPolicy.style.height = '0%';
        window.history.pushState({}, '', baseUrl);
    }
}

function openApplicationForm() {
    if (sectionWorkApplicationOverlay) {
        sectionWorkApplicationOverlay.style.height = '100%';
        const newUrl = `${baseUrl.slice(0, 0)}?apply-for-work=true`;
        window.history.pushState({}, '', newUrl);
    }
}

function closeApplicationForm() {
    if (sectionWorkApplicationOverlay) {
        sectionWorkApplicationOverlay.style.height = '0%';
        window.history.pushState({}, '', baseUrl);
    }
}

async function submitApplication() {

    const errorMessageContainer = document.getElementById('errorMessageContainer');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phoneNumber').value;
    const cv = document.getElementById('cv').files[0];

    if (name.trim() === '') {
        document.getElementById('name').focus();
        errorMessages = 'Full Name is required!';
        handleErrorMessage(errorMessages, errorMessageContainer);
        return true;
    }
    if (!twoWordsPattern.test(name.trim())) {
        document.getElementById('name').focus();
        errorMessages = 'Your Name is too Short!';
        handleErrorMessage(errorMessages, errorMessageContainer);
        return true;
    }
    if (email.trim() === '') {
        document.getElementById('email').focus();
        errorMessages = 'Email is required!';
        handleErrorMessage(errorMessages, errorMessageContainer);
        return true;
    }
    if (!emailPattern.test(email)) {
        document.getElementById('email').focus();
        errorMessages = 'Please enter a valid email address!';
        handleErrorMessage(errorMessages, errorMessageContainer);
        return true;
    }
    if (phone.trim() === '') {
        document.getElementById('phoneNumber').focus();
        errorMessages = 'Phone Number is required!';
        handleErrorMessage(errorMessages, errorMessageContainer);
        return true;
    }
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneNumber').focus();
        errorMessages = 'Please enter a valid phone number.';
        handleErrorMessage(errorMessages, errorMessageContainer);
        return true;
    }
    if (cv === null) {
        document.getElementById('cv').focus();
        errorMessages = 'Phone Number is required!';
        handleErrorMessage(errorMessages, errorMessageContainer);
        return true;
    }


    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phoneNumber').value);
    formData.append('cv', document.getElementById('cv').files[0]);

    const response = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        alert('Application submitted successfully!');
        closeApplicationForm();
    } else {
        alert('Failed to submit application.');
    }
}

/**
 * Method for displaying error messages to the user
 * @param {the error text to be displayed} errorMessage 
 * @param {the container for displaying the error text} errorMessageElement 
 * @returns a view if true
 */
function handleErrorMessage(errorMessage, errorMessageElement) {
    if (errorMessage && errorMessage.trim() !== '') {
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerHTML = errorMessage;

        setTimeout(() => {
            errorMessageElement.style.display = 'none';
        }, 4000);

        return false;
    } else {
        errorMessageElement.style.display = 'none';
        return true;
    }
}

// Add event listener for scrolling
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling with custom speed
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetSection = document.querySelector(link.getAttribute('href'));

        // Custom scroll function for smooth scrolling with adjustable speed
        smoothScrollTo(targetSection.offsetTop - 65, 5000); // 1000ms for the scroll duration
    });
});

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // Ease function for smooth scroll effect (ease-in-out)
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}


/**
 * This script is responsible for the animation of the services
 */
const services = [
    "WAXING",
    "BODY SCRUB",
    "HAIR SERVICES",
    "MAKE UP & LASHES",
    "EYEBROWS",
    "MEN SERVICES",
    "MASSAGE",
    "FACIALS"
];

/**
 * This function is responsible for animating the addition of the service components
 */
function animateAddition() {
    services.forEach((service, index) => {
        setTimeout(() => {
            // Create the banner element
            const banner = document.createElement('div');
            const hLayout = document.createElement('div');

            hLayout.classList.add('h-layout');
            banner.classList.add('banner', 'catalog-banner');
            banner.addEventListener('click', () => {
                const serviceDetail = document.getElementById(`service-${service.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}-detail`);
                if (serviceDetail) {
                    const offset = 70;
                    const topPosition = serviceDetail.offsetTop - offset;
                    window.scrollTo({ top: topPosition, behavior: 'smooth' });
                } else {
                    alert(`Service details for ${service} not found.\n Please Click the button Below for more Details.`);
                }
            });
            banner.innerHTML = `<p>${service}</p>`;

            // Add the banner to the layout
            serviceList.appendChild(banner);
            if (index === services.length - 1) {
                hLayout.innerHTML = '<button id="btnBookAppointment" class="flickering-button">BOOK NOW</button>';
                hLayout.innerHTML += '<button id="btnViewMoreServices" class="flickering-button">VIEW MORE SERVICES</button>';
                banner.parentNode.appendChild(hLayout);
            }
            // Trigger the animation
            setTimeout(() => {
                banner.classList.add('visible');
            }, 50); // Small delay to ensure animation
        }, index * 1000); // Delay each addition by 1 second
    });
}

// Start the animation
animateAddition();

// Function to initialize the backgrounds
function createBackgroundLayer(url) {
    const layer = document.createElement('div');
    layer.classList.add('background-image');
    layer.style.backgroundImage = `url(${url})`;
    sectionHome.appendChild(layer);
    return layer;
}

// Image background change
const images = [
    './resources/home-back-photo.jpeg',
    './resources/home-back-photo1.jpeg',
    './resources/serv2.jpeg',
    './resources/serv3.jpeg',
    './resources/serv8.jpeg',
];

let currentIndex = 0;

function changeBackground() {
    // Update the background-image using the current index
    sectionHome.style.backgroundImage = `
        linear-gradient(90deg, rgba(46, 35, 1, 0.8) 100%, rgba(235, 206, 39, 0.4) 70%), 
        url(${images[currentIndex]})
    `;

    // Increment the index and reset if it exceeds the array length
    currentIndex = (currentIndex + 1) % images.length;
}

// Initialize the first background
changeBackground();

// Set the interval for background changes
setInterval(changeBackground, 5000); // Change every 5 seconds


// Initilalize the testimonials container
const appContainer = document.querySelector('#sectionTestimonial .testimonial-container');

// Fetch ratings when the page loads
async function fetchRatings() {
    const response = await fetch('/ratings');
    const ratings = await response.json();
    appContainer.innerHTML = ratings.map(rating => `
        <div class="v-layout card-rating">
            <p id="clientName">${rating.clientName}</p>
            <p id="type">${rating.clientType}</p>
            <p id="clientComment">${rating.comment}</p>
            <div class="h-layout">
                ${Array(rating.stars).fill('<img src="./resources/star-rating.png" alt="">').join('')}
            </div>
            <p id="feedBack">Our Feedback</p>
            <p id="feedback">${rating.feedback}</p>
        </div>
    `).join('');
}

// Add a new rating
async function addRating(rating) {
    await fetch('/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rating)
    });
    // Refresh the ratings
    fetchRatings();
}

// Call fetchRatings to load initial data
fetchRatings();

// Add horizontal scroll functionality
appContainer.style.display = 'flex';
appContainer.style.overflowX = 'auto';
appContainer.style.gap = '16px';

// Function to send a welcome email
async function sendWelcomeEmail(clientName, clientEmail) {
    try {
        const response = await fetch(`api/send-contact-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientName: clientName,
                clientEmail: clientEmail,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to send email');
        }

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error while sending welcome email:', error);
        throw error;
    }
}

const photos = [
    './resources/serv21.jpeg', 
    './resources/serv22.jpeg', 
    './resources/serv23.jpeg', 
    './resources/serv24.jpeg', 
    './resources/serv25.jpeg', 
    './resources/serv26.jpeg', 
    './resources/serv27.jpeg', 
    './resources/serv28.jpeg', 
    './resources/serv29.jpeg', 
    './resources/serv31.jpeg', 
    './resources/serv32.jpeg', 
    './resources/ser33.jpeg', 
    './resources/owner.jpeg', 
    './resources/serv34.jpeg', 
    './resources/serv35.jpeg', 
    './resources/serv36.jpeg', 
    './resources/serv37.jpeg', 
    './resources/serv38.jpeg', 
    './resources/serv39.jpeg', 
    './resources/serv40.jpeg', 
    './resources/serv2.jpeg', 
    './resources/serv3.jpeg', 
    './resources/serv4.jpeg', 
    './resources/serv8.jpeg', 
    './resources/serv10.jpeg', 
    './resources/serv15.jpeg', 
    './resources/home-back-photo.jpeg', 
    './resources/home-back-photo1.jpeg', 
    './resources/home-back-photo2.jpeg',
    './resources/serv11.jpg', 
    './resources/serv12.jpg', 
    './resources/serv9.jpeg', 
    './resources/serve7.jpeg'
];

const videos = [
    '/public/resources/vid1.mp4', 
    '/public/resources/vid2.mp4', 
    '/public/resources/vid3.mp4', 
    '/public/resources/vid4.mp4', 
    '/public/resources/vid5.mp4', 
    '/public/resources/vid6.mp4', 
    '/public/resources/vid7.mp4', 
    '/public/resources/vid8.mp4', 
    '/public/resources/vid9.mp4', 
    '/public/resources/vid10.mp4', 
    '/public/resources/vid11.mp4', 
    '/public/resources/vid12.mp4', 
    '/public/resources/vid13.mp4', 
    '/public/resources/vid14.mp4', 
    '/public/resources/vid15.mp4', 
    '/public/resources/vid16.mp4', 
    '/public/resources/vid17.mp4'
];

const photoSection = document.getElementById('photoSection');
const videoSection = document.getElementById('videoSection');
const photoPopupLeft = document.getElementById('photoPopupLeft');
const photoPopupCenter = document.getElementById('photoPopupCenter');
const photoPopupRight = document.getElementById('photoPopupRight');
const videoPopup = document.getElementById('videoPopup');
const overlay = document.getElementById('overlay');
const popupPhoto = document.getElementById('popupPhoto');
const popupVideo = document.getElementById('popupVideo');

let currentPhotoIndex = 0;
let currentBackgroundIndex = 0;

// Populate Photo Section
photos.forEach((photo, index) => {
    const img = document.createElement('img');
    img.src = photo;
    img.alt = `Photo ${index + 1}`;
    img.onclick = () => showPhotoPopup(index);
    photoSection.appendChild(img);
    balanceSectionHeights();
});

// Populate Video Section
videos.forEach((video, index) => {
    const vid = document.createElement('video');
    vid.src = video;
    vid.loop = true;
    vid.muted = true;
    vid.onmouseover = () => vid.play();
    vid.onmouseout = () => vid.pause();
    vid.onclick = () => showVideoPopup(video);
    videoSection.appendChild(vid);
    balanceSectionHeights();
});

// Photo Popup Functions
function showPhotoPopup(index) {
    currentPhotoIndex = index;
    photoPopupCenter.style.backgroundImage = `url(${photos[index]})`;
    updateBackground();
    overlay.style.height = '100%';
}

function closePopup() {
    videoPopup.style.display = 'none';
    overlay.style.height = '0%';
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    photoPopupCenter.style.backgroundImage = `url(${photos[currentPhotoIndex]})`;
    updateBackground();
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    photoPopupCenter.style.backgroundImage = `url(${photos[currentPhotoIndex]})`;
    updateBackground();
}

function updateBackground() {
    const backgroundPhoto = photos[currentPhotoIndex];
    photoPopupCenter.style.backgroundImage = `linear-gradient(90deg, rgba(46, 35, 1, 0.0)100%, rgba(235, 206, 39, 0.4)70%), url(${backgroundPhoto})`;
    photoPopupLeft.style.backgroundImage = `linear-gradient(90deg, rgba(0, 0, 0, 0.77)100%,rgba(235, 206, 39, 0.4)70%),url(${photos[(currentPhotoIndex - 1 + photos.length) % photos.length]})`;
    photoPopupRight.style.backgroundImage = `linear-gradient(90deg, rgba(0, 0, 0, 0.77)100%,rgba(235, 206, 39, 0.4)70%),url(${photos[(currentPhotoIndex + 1) % photos.length]})`;
}

// Video Popup Functions
function showVideoPopup(video) {
    popupVideo.src = video;
    videoPopup.style.display = 'flex';
    overlay.style.display = 'block';
}

function balanceSectionHeights() {
    const photoSectionHeight = photoSection.offsetHeight;
    const videoSectionHeight = videoSection.offsetHeight;

    if (photoSectionHeight > videoSectionHeight) {
        videoSection.style.minHeight = `${photoSectionHeight}px`;
    } else {
        photoSection.style.minHeight = `${videoSectionHeight}px`;
    }
}