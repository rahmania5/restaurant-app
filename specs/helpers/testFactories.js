/* eslint-disable import/prefer-default-export */
import favButtonInitiator from '../../src/scripts/utils/fav-btn-initiator';

const createFavButtonPresenterWithRestaurant = async (restaurant) => {
  await favButtonInitiator.init({
    favButtonContainer: document.querySelector('#favoriteButtonContainer'),
    restaurant,
  });
};

export { createFavButtonPresenterWithRestaurant };
