console.log('main.js - Loaded');

// Component initialization
const serviceList = document.getElementById('serviceList');
const sectionHome = document.getElementById('sectionHome');

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

// Add event listener for scrolling
window.addEventListener('scroll', function() {
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
    link.addEventListener('click', function(e) {
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
    './resources/home-back-photo2.jpeg'
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