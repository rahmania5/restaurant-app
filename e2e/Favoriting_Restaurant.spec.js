/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favoriting Restaurant');

Scenario('favoriting and unfavorite a restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('.name_rating a');

  const firstRestaurant = locate('.name_rating a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#favButton');
  I.click('#favButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.catalogs');
  const favRestaurantName = await I.grabTextFrom('.name_rating a');

  assert.strictEqual(firstRestaurantName, favRestaurantName);

  I.click(firstRestaurant);

  I.seeElement('#favButton');
  I.click('#favButton');

  I.amOnPage('/#/favorite');
});
