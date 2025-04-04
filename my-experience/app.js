// Ensure the app container exists
const app = document.querySelector('#app');

// Main function to load and display content
const main = async () => {
  console.log("Initializing Showpad app...");

  // Wait for Showpad lib to load
  if (window.Showpad) {
    await Showpad.onShowpadLibLoaded();
  } else {
    console.error('Showpad library is not loaded.');
    return;
  }

  try {
    // Parse enriched config data from Showpad
    const { labels, contents, assets } = await Showpad.parseEnrichedConfig();
    console.log("Showpad Config Loaded:", labels, contents, assets);

    // Handle breadcrumbs logic
    const breadcrumbContainer = document.querySelector('.breadcrumbs');

    if (breadcrumbContainer) {
      console.log("Breadcrumb container found.");

      // Start with the Home link
      breadcrumbContainer.innerHTML = '<a href="index.html"><i class="fas fa-home"></i> Home</a> &gt; ';

      // Get current page name from URL
      const currentUrl = window.location.pathname;
      console.log("Current URL:", currentUrl);

      let pageName = currentUrl.split('/').pop()?.replace('.html', '').replace(/-/g, ' ');

      if (pageName && pageName.toLowerCase() !== "index") {
        pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        breadcrumbContainer.innerHTML += `<span>${pageName}</span>`;
      } else {
        console.log("Index page detected, no additional breadcrumb needed.");
      }
    } else {
      console.warn("Breadcrumb container not found. Skipping breadcrumb update.");
    }

    // Display the label as our title
    if (app) {
      app.innerHTML = `<h1>${labels?.label_example?.value || "Welcome to GrowGuide"}</h1>`;
    } else {
      console.warn("App container not found. Skipping title update.");
    }

    // Example for showing an asset (optional)
    const exampleAsset = contents.asset_example?.result?.[0];
    if (exampleAsset) {
      console.log("Example asset found:", exampleAsset);

      const button = document.createElement('button');
      button.innerHTML = `Open ${exampleAsset.displayName}`;
      button.addEventListener('click', () => Showpad.openAssetViewer(exampleAsset.slug));
      app?.appendChild(button);
    } else {
      console.log("No example asset found.");
    }
  } catch (error) {
    console.error("Error loading Showpad config:", error);
    Showpad.handleErrorWithToast(error);
  }
};

// Ensure script runs at the correct time
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded, running main script...");
  main();
});



/*

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript is running');
  
  // Dynamically load the header content
  fetch('header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load header.html');
      }
      return response.text();
    })
    .then(data => {
      console.log('Header loaded successfully:', data);
      const headerContainer = document.getElementById('header-container');
      if (headerContainer) {
        headerContainer.innerHTML = data;
        headerContainer.classList.add('header-loaded');
      }
    })
    .catch(error => {
      console.error('Error loading header:', error);
    });

  // Other logic like sun-loving plants toggle, etc.
  main();
});
*/
