import FavRestaurantIdb from '../../data/favrestaurant-db';
import { createCatalogTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <div class="content">
        <h2>Favorite Restaurants</h2>
        <section id="resto-catalogs" class="card catalogs">

        </section>
      </div>
      `;
  },

  async afterRender() {
    const restaurants = await FavRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#resto-catalogs');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createCatalogTemplate(restaurant);
    });
  },
};

export default Favorite;
