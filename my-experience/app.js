import { Showpad } from '@showpad/experience-app-sdk';
import './style.css';

// Make sure the index.html has a div with id="app"
const app = document.querySelector('#app');

const main = async () => {
  await Showpad.onShowpadLibLoaded();

  try {
    const { labels, contents, assets } = await Showpad.parseEnrichedConfig();

    // Breadcrumbs logic
    const breadcrumbContainer = document.querySelector('.breadcrumbs');
    breadcrumbContainer.innerHTML = '<a href="index.html"><i class="fas fa-home"></i></a> &gt; ';

    const currentUrl = window.location.pathname;
    const pageName = currentUrl.split('/').pop().replace('.html', '').replace(/-/g, ' ').toUpperCase();
    breadcrumbContainer.innerHTML += `<span>${pageName}</span>`;

    app.innerHTML = `<h1>${labels.label_example.value}</h1>`;

    const exampleAsset = contents.asset_example.result?.[0];
    if (exampleAsset) {
      const button = document.createElement('button');
      button.innerHTML = `Open ${exampleAsset.displayName}`;
      button.addEventListener('click', () => Showpad.openAssetViewer(exampleAsset.slug));
      app.appendChild(button);
    }
  } catch (error) {
    Showpad.handleErrorWithToast(error);
  }
};

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
