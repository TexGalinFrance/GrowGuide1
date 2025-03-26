import { Showpad } from '@showpad/experience-app-sdk';
import './style.css';

interface Config extends Showpad.EnrichedConfigJSON {
  labels: {
    label_example: Showpad.Label;
  };
  contents: {
    asset_example: Showpad.ContentAsset;
  };
}

// Make sure the index.html has a div with id="app"
const app = document.querySelector<HTMLDivElement>('#app')!;

const main = async (): Promise<void> => {
  // Always wait for ShowpadLib to be loaded
  await Showpad.onShowpadLibLoaded();

  try {
    // Destructure labels, contents, and assets retrieved from Showpad.parseEnrichedConfig()
    const { labels, contents, assets } = await Showpad.parseEnrichedConfig<Config>();

    // Start with the "Home" link in the breadcrumbs
    const breadcrumbContainer = document.querySelector('.breadcrumbs')!;
    breadcrumbContainer.innerHTML = '<a href="index.html"><i class="fas fa-home"></i></a> &gt; ';
    
    // Set the title for the current page in the breadcrumbs
    const currentUrl = window.location.pathname;
    const pageName = currentUrl.split('/').pop()!.replace('.html', '').replace(/-/g, ' ').toUpperCase();
    breadcrumbContainer.innerHTML += `<span>${pageName}</span>`;

    // Display the title in the app dynamically
    app.innerHTML = `<h1>${labels.label_example.value}</h1>`;

    // Example for showing an asset (optional based on your needs)
    const exampleAsset = contents.asset_example.result?.[0];
    if (exampleAsset) {
      const button = document.createElement('button');
      button.innerHTML = `Open ${exampleAsset.displayName}`;
      button.addEventListener('click', () => Showpad.openAssetViewer(exampleAsset.slug));
      app.appendChild(button);
    }
  } catch (error) {
    // Show a native error toast
    Showpad.handleErrorWithToast(error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Dynamically load the header content
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      const headerContainer = document.getElementById('header-container');
      headerContainer!.innerHTML = data;
      headerContainer!.classList.add('header-loaded'); // Ensures proper styling is applied
    })
    .catch(error => {
      console.error('Error loading header:', error);
    });

  // Sun-loving plants toggle functionality
  const sunLovingCard = document.getElementById("sun-loving-card");
  const plantList = document.getElementById("plant-list");

  document.getElementById("toggle-sun-loving")?.addEventListener("click", () => {
    // Toggle visibility of the sun-loving card and the plant list
    if (sunLovingCard && plantList) {
      if (plantList.style.display === "none") {
        plantList.style.display = "block";  // Show the plant list
        sunLovingCard.style.display = "none";  // Hide the sun-loving card
      } else {
        plantList.style.display = "none";  // Hide the plant list
        sunLovingCard.style.display = "block";  // Show the sun-loving card
      }
    }
  });

  // Run the main function
  main();
});
