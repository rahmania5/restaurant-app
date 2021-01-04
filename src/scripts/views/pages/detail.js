import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate, createErrorTemplate } from '../templates/template-creator';
import FavButtonInitiator from '../../utils/fav-btn-initiator';

const Detail = {
  async render() {
    return `
      <div class="content">
        <h2>Detail Page</h2>
        <article id="resto-catalogs" class="card restaurant"></article>
        <div id="favoriteButtonContainer"></div>
      </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const status = await RestaurantSource.detailStatus(url.id);
    const restaurantContainer = document.querySelector('#resto-catalogs');
    if (status === false) {
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    } else {
      restaurantContainer.innerHTML = createErrorTemplate();
    }

    FavButtonInitiator.init({
      favButtonContainer: document.querySelector('#favoriteButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      },
    });
  },
};

export default Detail;
