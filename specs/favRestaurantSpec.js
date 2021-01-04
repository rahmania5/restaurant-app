/* eslint-disable no-undef */
import FavRestaurantIdb from '../src/scripts/data/favrestaurant-db';
import * as TestFactories from './helpers/testFactories';

describe('Save Restaurant as Favorite', () => {
  const addFavButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(() => {
    addFavButtonContainer();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="save restaurant as favorite"]')).toBeTruthy();
  });

  it('should not show the unfavorited button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="remove restaurant from favorite"]')).toBeFalsy();
  });

  it('should be able to save restaurant as favorite', async () => {
    await TestFactories.createFavButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#favButton').dispatchEvent(new Event('click'));
    const restaurant = await FavRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await TestFactories.createFavButtonPresenterWithRestaurant({ id: 1 });

    await FavRestaurantIdb.putRestaurant({ id: 1 });
    document.querySelector('#favButton').dispatchEvent(new Event('click'));

    expect(await FavRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
    FavRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createFavButtonPresenterWithRestaurant({});

    document.querySelector('#favButton').dispatchEvent(new Event('click'));
    expect(await FavRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
