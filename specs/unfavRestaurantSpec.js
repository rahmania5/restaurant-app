/* eslint-disable no-undef */
import FavRestaurantIdb from '../src/scripts/data/favrestaurant-db';
import * as TestFactories from './helpers/testFactories';

const addFavButtonContainer = () => {
  document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
};

describe('Remove Restaurant from Favorite', () => {
  beforeEach(async () => {
    addFavButtonContainer();
    await FavRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unfavorite widget when the restaurant has been favorited', async () => {
    await TestFactories.createFavButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="remove restaurant from favorite"]'))
      .toBeTruthy();
  });

  it('should not display favorite widget when the restaurant has been favorited', async () => {
    await TestFactories.createFavButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="save restaurant as favorite"]'))
      .toBeFalsy();
  });

  it('should be able to remove favorited restaurant from the list', async () => {
    await TestFactories.createFavButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('[aria-label="remove restaurant from favorite"]').dispatchEvent(new Event('click'));
    expect(await FavRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unfavorited restaurant is not in the list', async () => {
    await TestFactories.createFavButtonPresenterWithRestaurant({ id: 1 });

    await FavRestaurantIdb.deleteRestaurant(1);

    document.querySelector('[aria-label="remove restaurant from favorite"]').dispatchEvent(new Event('click'));
    expect(await FavRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
