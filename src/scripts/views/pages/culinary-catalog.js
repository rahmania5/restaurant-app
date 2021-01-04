import RestaurantSource from '../../data/restaurant-source';
import { createCatalogTemplate } from '../templates/template-creator';

const CulinaryCatalog = {
  async render() {
    return `
      <div class="content">
        <h2>Culinary Catalog</h2>
        <section id="resto-catalogs" class="card catalogs"></section>
      </div>
      `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.restaurantList();
    const restaurantsContainer = document.querySelector('#resto-catalogs');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createCatalogTemplate(restaurant);
    });
  },
};

export default CulinaryCatalog;
