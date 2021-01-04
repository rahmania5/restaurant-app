import '@fortawesome/fontawesome-free/js/all.js';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import CONFIG from '../../globals/config';

const createCatalogTemplate = ({
  id, name, pictureId, rating, city, description,
}) => `
    <div class="catalog">
        <div class="container">
            <div class="city">${city}</div>
            <figure>
                <img class="lazyload featured-image" data-src="${CONFIG.BASE_IMAGE_URL + pictureId}" alt="${name}" crossorigin="anonymous">
                <figcaption class="name_rating">
                    Rating: ${rating} <br> 
                    <a href="${`/#/detail/${id}`}">${name}</a></figcaption>
            </figure>
        </div>
        <p> ${description} </p>
    </div>
  `;

const createRestaurantDetailTemplate = ({
  name, pictureId, rating, city, address, categories, menus, consumerReviews, description,
}) => {
  let listFood = '';
  let listDrink = '';
  let listReview = '';

  for (const food of menus.foods) {
    listFood += `<li><fa-icon class="fas fa-angle-right" aria-hidden="true"></fa-icon> ${food.name}</li>`;
  }

  for (const drink of menus.drinks) {
    listDrink += `<li><fa-icon class="fas fa-angle-right" aria-hidden="true"></fa-icon> ${drink.name}</li>`;
  }

  for (const consumerReview of consumerReviews) {
    listReview += `
      <div class="review">
          <p><fa-icon class="fas fa-user" aria-hidden="true"></fa-icon> ${consumerReview.name}</p>
          <p>${consumerReview.review}</p>
          <p class="review__date">${consumerReview.date}</p>
      </div>
       `;
  }

  return (`
      <div class="catalog info">
        <div class="container">
            <div class="city">${city}</div>
            <figure>
                <img src="${CONFIG.BASE_IMAGE_URL + pictureId}" class="featured-image" alt="${name}" crossorigin="anonymous">
                <figcaption>
                    Rating: ${rating} <br> 
                    ${name}</figcaption>
            </figure>
            <h3><fa-icon class="fas fa-info-circle" aria-hidden="true"></fa-icon> Information</h3>
            <h4>Address</h3>
            <p>${address}</p>
            <h4>Menu Categories</h3>
            <p>${categories.map((category) => category.name).join(', ')}</p>
            <h4>About Restaurant</h3>
            <p>${description}</p>
        </div>
      </div>
      <div class="catalog foods">
        <h3><fa-icon class="fas fa-hamburger" aria-hidden="true"></fa-icon> Foods</h3>
        <ul>${listFood}</ul>
      </div>
      <div class="catalog drinks">
        <h3><fa-icon class="fas fa-mug-hot" aria-hidden="true"></fa-icon> Beverages</h3>
        <ul>${listDrink}</ul>
      </div>
      <div class="catalog reviews">
        <h3><fa-icon class="fas fa-comments" aria-hidden="true"></fa-icon> Reviews</h3>
        ${listReview}
      </div>
    `);
};

const createErrorTemplate = () => `
  <h3> Please go online to see the restaurant details. </h3>
`;

const createFavoriteButtonTemplate = () => `
  <button aria-label="save restaurant as favorite" id="favButton" class="favorite">
     <fa-icon class="far fa-star" aria-hidden="true"></fa-icon>
  </button>
`;

const createUnfavoriteButtonTemplate = () => `
  <button aria-label="remove restaurant from favorite" id="favButton" class="favorite">
    <fa-icon class="fas fa-star" aria-hidden="true"></fa-icon>
  </button>
`;

export {
  createCatalogTemplate,
  createRestaurantDetailTemplate,
  createErrorTemplate,
  createFavoriteButtonTemplate,
  createUnfavoriteButtonTemplate,
};
