document.addEventListener("DOMContentLoaded", function () {
    // Get the full current path
    const currentUrl = window.location.pathname;

    // Split the URL into parts by slashes
    const urlParts = currentUrl.split('/').filter(Boolean);  // Filter out empty parts

    // Get the last part of the URL which is the actual page name (without folder)
    const pageName = urlParts[urlParts.length - 1];  // This will be the page name, e.g., "ornamental-plants.html"

    // Initialize breadcrumb container
    const breadcrumbContainer = document.querySelector(".breadcrumbs");
    breadcrumbContainer.innerHTML = '';  // Clear any existing breadcrumbs

    // Start with the "Home" link
    breadcrumbContainer.innerHTML = '<a href="index.html">Home</a>';

    // Add a separator ">" for better readability
    breadcrumbContainer.innerHTML += ' &gt; ';

    // Create and append the breadcrumb for the current page (without file extension)
    const pageTitle = pageName.replace('.html', '').replace(/-/g, ' ').toUpperCase();  // Remove .html and replace hyphens with spaces

    const link = document.createElement('a');
    link.href = currentUrl;  // The current page's URL
    link.textContent = pageTitle.charAt(0) + pageTitle.slice(1).toLowerCase();  // Capitalize first letter

    // Append the link to the breadcrumbs
    breadcrumbContainer.appendChild(link);
});


document.addEventListener("DOMContentLoaded", function () {
    // Load the header dynamically
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('header-container');
            headerContainer.innerHTML = data;

            // After loading header, we can ensure CSS is applied
            headerContainer.classList.add('header-loaded');  // Example class to reflow the header
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
});

// Dynamically load the header
document.getElementById('header-container').classList.add('loaded'); `
    <header>
        <h1><img src="images/gardening.png" alt="GrowGuide Logo" class="logo"> GrowGuide</h1>
        <p>Discover beautiful plants for your garden</p>
    </header>
`;

// Dynamically generate the breadcrumb navigation
window.onload = function() {
    document.querySelector('.breadcrumbs').innerHTML = `
        <a href="index.html"><i class="fas fa-home"></i></a> > <span>Ornamental Plants</span>
    `;
};

// sun plants toggle
document.getElementById("toggle-sun-loving").addEventListener("click", function() {
    var plantList = document.getElementById("plant-list");
    var sunLovingCard = document.getElementById("sun-loving-card");

    // Toggle visibility of the plant list
    if (plantList.style.display === "none") {
        plantList.style.display = "block"; // Show the list
        sunLovingCard.style.display = "none"; // Hide the card
    } else {
        plantList.style.display = "none"; // Hide the list
        sunLovingCard.style.display = "block"; // Show the card
    }
});


