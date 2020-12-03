import SiteHeader from './view/site-header.js';
import SiteFilter from './view/filter-menu.js';
import SortMenu from './view/sort-menu.js';
import SiteFilmsBord from './view/films-board.js';
import FilmCard from './view/film-card.js';
import ButtonShowMore from './view/button.js';
import TopRatedFilms from './view/top-rated.js';
import MostCommentedFilms from './view/most-commented.js';
import FooterStats from './view/footer-stats.js';
import FilmDetail from './view/film-details.js';
import {generateFilm, filmsList as filmsColl} from './mock/film.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './util.js';

const FILMS_COUNT_PER_STEP = 5;
let renderFilmsCount = FILMS_COUNT_PER_STEP;

const films = filmsColl.map((film) => {
  return generateFilm(film);
});

const filters = generateFilters(films);

const body = document.querySelector(`body`);
const headerSiteElement = document.querySelector(`.header`);
render(headerSiteElement, new SiteHeader().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
const renderfilmsBoardCompanent = new SiteFilmsBord();
render(siteMainElement, new SiteFilter(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenu().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, renderfilmsBoardCompanent.getElement(), RenderPosition.BEFOREEND);

const filmsList = renderfilmsBoardCompanent.getElement().querySelector(`.films-list`);
render(renderfilmsBoardCompanent.getElement(), new TopRatedFilms().getElement(), RenderPosition.BEFOREEND);
render(renderfilmsBoardCompanent.getElement(), new MostCommentedFilms().getElement(), RenderPosition.BEFOREEND);

const filmsListContainer = renderfilmsBoardCompanent.getElement().querySelector(`.films-list__container`);
const renderFilmCardDetails = (container, film) => {
  const FilmDetailComponent = new FilmDetail(film);

  const buttonClose = FilmDetailComponent.getElement().querySelector(`.film-details__close-btn`);

  const onButtonCloseClick = (evt) => {
    evt.preventDefault();
    body.classList.remove(`hide-overflow`);
    FilmDetailComponent.getElement().remove();
    FilmDetailComponent.removeElement();
    FilmDetailComponent.getElement().removeEventListener(`click`, onButtonCloseClick);
  };

  buttonClose.addEventListener(`click`, onButtonCloseClick);

  render(container, FilmDetailComponent.getElement(), RenderPosition.BEFOREEND);
};
const renderFilmCard = (filmListElement, film) => {
  const FilmCardComponent = new FilmCard(film);

  const filmCardPoster = FilmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCardTitle = FilmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmCardComments = FilmCardComponent.getElement().querySelector(`.film-card__comments`);

  filmCardPoster.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    body.classList.add(`hide-overflow`);
    renderFilmCardDetails(body, film);
  });

  filmCardTitle.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    body.classList.add(`hide-overflow`);
    renderFilmCardDetails(body, film);
  });

  filmCardComments.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    body.classList.add(`hide-overflow`);
    renderFilmCardDetails(body, film);
  });

  render(filmListElement, FilmCardComponent.getElement(), RenderPosition.BEFOREEND);
};
films.slice(0, FILMS_COUNT_PER_STEP).forEach((film) => renderFilmCard(filmsListContainer, film));

const filmsExtra = Array.from(renderfilmsBoardCompanent.getElement().querySelectorAll(`.films-list--extra .films-list__container`));
const [topRatedContainer, mostCommentedContainer] = filmsExtra;
const topRated = films.slice().sort((a, b) => b.rating - a.rating);
topRated.slice(0, 2).forEach((film) => renderFilmCard(topRatedContainer, film));

const mostCommented = films.slice().sort((a, b) => b.comments.length - a.comments.length);
mostCommented.slice(0, 2).forEach((film) => renderFilmCard(mostCommentedContainer, film));

const footerSiteElement = document.querySelector(`.footer__statistics`);
render(footerSiteElement, new FooterStats().getElement(), RenderPosition.BEFOREEND);

if (films.length > FILMS_COUNT_PER_STEP) {
  const ButtonShowMoreCompanent = new ButtonShowMore();
  render(filmsList, ButtonShowMoreCompanent.getElement(), RenderPosition.BEFOREEND);

  ButtonShowMoreCompanent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilmCard(filmsListContainer, film));

    renderFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderFilmsCount >= films.length) {
      ButtonShowMoreCompanent.getElement().remove();
      ButtonShowMoreCompanent.removeElement();
    }
  });
}
