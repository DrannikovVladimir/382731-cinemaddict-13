import {createSiteHeaderTemplate} from './view/header-profile.js';
import {createSiteFilterTemplate} from './view/filter-menu.js';
import {createSortMenuTemplate} from './view/sort-menu.js';
import {createSiteFilmsBord} from './view/films-board.js';
import {createFilmCard} from './view/film-card.js';
import {createButtonShowMore} from './view/button.js';
import {createTopRatedFilms} from './view/top-rated.js';
import {createMostCommentedFilms} from './view/most-commented.js';
import {createFooterStats} from './view/footer-stats.js';
import {createFilmsPopup} from './view/popup-films';
import {createFilmCommentsDesc} from './view/comments.js';
import {generateFilm, filmsList as filmsColl} from './mock/film.js';
import {generateFilters} from './mock/filter.js';

const PLACE = `beforeend`;
const FILMS_COUNT_PER_STEP = 5;
let renderFilmsCount = FILMS_COUNT_PER_STEP;

const films = filmsColl.map((film) => {
  return generateFilm(film);
});

const filters = generateFilters(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const body = document.querySelector(`body`);
render(body, createFilmsPopup(films[0]), PLACE);
const filmDetails = body.querySelector(`.film-details`);
const filmCommentsDesc = filmDetails.querySelector(`.film-details__comments-wrap`);
render(filmCommentsDesc, createFilmCommentsDesc(films[0].comments), PLACE);

const headerSiteElement = body.querySelector(`.header`);
render(headerSiteElement, createSiteHeaderTemplate(), PLACE);

const siteMainElement = body.querySelector(`.main`);
render(siteMainElement, createSiteFilterTemplate(filters), PLACE);
render(siteMainElement, createSortMenuTemplate(), PLACE);
render(siteMainElement, createSiteFilmsBord(), PLACE);

const filmsBoard = siteMainElement.querySelector(`.films`);
const filmsList = filmsBoard.querySelector(`.films-list`);
render(filmsBoard, createTopRatedFilms(), PLACE);
render(filmsBoard, createMostCommentedFilms(), PLACE);

const filmsListContainer = filmsBoard.querySelector(`.films-list__container`);
films.slice(0, FILMS_COUNT_PER_STEP).forEach((film) => render(filmsListContainer, createFilmCard(film), PLACE));

const filmsExtra = Array.from(filmsBoard.querySelectorAll(`.films-list--extra .films-list__container`));
const [topRatedContainer, mostCommentedContainer] = filmsExtra;
const topRated = films.slice().sort((a, b) => b.rating - a.rating);
topRated.slice(0, 2).forEach((film) => render(topRatedContainer, createFilmCard(film), PLACE));
const mostCommented = films.slice().sort((a, b) => b.comments.length - a.comments.length);
mostCommented.slice(0, 2).forEach((film) => render(mostCommentedContainer, createFilmCard(film), PLACE));

const footerSiteElement = body.querySelector(`.footer__statistics`);
render(footerSiteElement, createFooterStats(), PLACE);

if (films.length > FILMS_COUNT_PER_STEP) {
  render(filmsList, createButtonShowMore(), PLACE);

  const loadMoreButton = filmsList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainer, createFilmCard(film), PLACE));

    renderFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderFilmsCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

filmDetails.style = `display: none`;
