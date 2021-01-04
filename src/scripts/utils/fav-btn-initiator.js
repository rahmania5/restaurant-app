import FavRestaurantIdb from '../data/favrestaurant-db';
import { createFavoriteButtonTemplate, createUnfavoriteButtonTemplate } from '../views/templates/template-creator';

const favButtonInitiator = {
  async init({ favButtonContainer, restaurant }) {
    this._favButtonContainer = favButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderfavorited();
    } else {
      this._renderfav();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderfav() {
    this._favButtonContainer.innerHTML = createFavoriteButtonTemplate();

    const favButton = document.querySelector('#favButton');
    favButton.addEventListener('click', async () => {
      await FavRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderfavorited() {
    this._favButtonContainer.innerHTML = createUnfavoriteButtonTemplate();

    const favButton = document.querySelector('#favButton');
    favButton.addEventListener('click', async () => {
      await FavRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default favButtonInitiator;
