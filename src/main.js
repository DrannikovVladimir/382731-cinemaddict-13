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
import {createFilmComments} from './view/comments.js';

const PLACE = `beforeend`;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const body = document.querySelector(`body`);
render(body, createFilmsPopup(), PLACE);

const filmDetails = body.querySelector(`.film-details`);
const filmComments = filmDetails.querySelector(`.film-details__comments-wrap`);
render(filmComments, createFilmComments(), PLACE);

const headerSiteElement = body.querySelector(`.header`);
render(headerSiteElement, createSiteHeaderTemplate(), PLACE);

const siteMainElement = body.querySelector(`.main`);
render(siteMainElement, createSiteFilterTemplate(), PLACE);
render(siteMainElement, createSortMenuTemplate(), PLACE);
render(siteMainElement, createSiteFilmsBord(), PLACE);

const filmsBoard = siteMainElement.querySelector(`.films`);
const filmsList = filmsBoard.querySelector(`.films-list`);
render(filmsList, createButtonShowMore(), PLACE);
render(filmsBoard, createTopRatedFilms(), PLACE);
render(filmsBoard, createMostCommentedFilms(), PLACE);

const filmsListContainer = filmsBoard.querySelector(`.films-list__container`);
for (let i = 0; i < 5; i += 1) {
  render(filmsListContainer, createFilmCard(), PLACE);
}

const filmsExtra = filmsBoard.querySelectorAll(`.films-list--extra .films-list__container`);
filmsExtra.forEach((film) => {
  for (let i = 0; i < 2; i += 1) {
    render(film, createFilmCard(), PLACE);
  }
});

const footerSiteElement = body.querySelector(`.footer__statistics`);
render(footerSiteElement, createFooterStats(), PLACE);

filmDetails.style = `display: none`;
