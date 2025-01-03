// Component initialization
const serviceList = document.getElementById('serviceList');

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
                    alert(`Service details for ${service} not found.`);
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