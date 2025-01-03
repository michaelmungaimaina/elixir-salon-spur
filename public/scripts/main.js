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
});
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