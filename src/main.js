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
import FilmsEmpty from './view/films-empty.js';
import {generateFilm, filmsList as filmsColl} from './mock/film.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './util.js';

const FILMS_COUNT_PER_STEP = 5;
let renderFilmsCount = FILMS_COUNT_PER_STEP;

let films = filmsColl.map((film) => {
  return generateFilm(film);
});

const filters = generateFilters(films);
const renderFilmCardDetails = (container, film) => {
  const FilmDetailComponent = new FilmDetail(film);

  const buttonClose = FilmDetailComponent.getElement().querySelector(`.film-details__close-btn`);

  const onButtonCloseClick = (evt) => {
    evt.preventDefault();
    body.classList.remove(`hide-overflow`);
    FilmDetailComponent.getElement().remove();
    FilmDetailComponent.removeElement();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      body.classList.remove(`hide-overflow`);
      FilmDetailComponent.getElement().remove();
      FilmDetailComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  buttonClose.addEventListener(`click`, onButtonCloseClick);
  document.addEventListener(`keydown`, onEscKeyDown);

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

const renderBoard = (boardContainer, boardFilms) => {
  const filmBoardCompanent = new SiteFilmsBord();
  render(siteMainElement, filmBoardCompanent.getElement(), RenderPosition.BEFOREEND);
  if (boardFilms.length === 0) {
    filmBoardCompanent.getElement().innerHTML = ``;
    const filmsEmptyComponent = new FilmsEmpty();
    render(filmBoardCompanent.getElement(), filmsEmptyComponent.getElement(), RenderPosition.BEFOREEND);
  } else {
    const filmsList = filmBoardCompanent.getElement().querySelector(`.films-list`);
    const filmsListContainer = filmBoardCompanent.getElement().querySelector(`.films-list__container`);

    render(filmBoardCompanent.getElement(), new TopRatedFilms().getElement(), RenderPosition.BEFOREEND);
    render(filmBoardCompanent.getElement(), new MostCommentedFilms().getElement(), RenderPosition.BEFOREEND);

    boardFilms.slice(0, FILMS_COUNT_PER_STEP).forEach((film) => renderFilmCard(filmsListContainer, film));

    const filmsExtra = Array.from(filmBoardCompanent.getElement().querySelectorAll(`.films-list--extra .films-list__container`));
    const [topRatedContainer, mostCommentedContainer] = filmsExtra;
    const topRated = boardFilms.slice().sort((a, b) => b.rating - a.rating);
    topRated.slice(0, 2).forEach((film) => renderFilmCard(topRatedContainer, film));

    const mostCommented = boardFilms.slice().sort((a, b) => b.comments.length - a.comments.length);
    mostCommented.slice(0, 2).forEach((film) => renderFilmCard(mostCommentedContainer, film));

    if (boardFilms.length > FILMS_COUNT_PER_STEP) {
      const ButtonShowMoreCompanent = new ButtonShowMore();
      render(filmsList, ButtonShowMoreCompanent.getElement(), RenderPosition.BEFOREEND);

      ButtonShowMoreCompanent.getElement().addEventListener(`click`, (evt) => {
        evt.preventDefault();
        boardFilms
          .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
          .forEach((film) => renderFilmCard(filmsListContainer, film));

        renderFilmsCount += FILMS_COUNT_PER_STEP;

        if (renderFilmsCount >= boardFilms.length) {
          ButtonShowMoreCompanent.getElement().remove();
          ButtonShowMoreCompanent.removeElement();
        }
      });
    }
  }
};

const body = document.querySelector(`body`);
const headerSiteElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerSiteElement = document.querySelector(`.footer__statistics`);

render(headerSiteElement, new SiteHeader().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteFilter(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenu().getElement(), RenderPosition.BEFOREEND);
renderBoard(siteMainElement, films);
render(footerSiteElement, new FooterStats().getElement(), RenderPosition.BEFOREEND);
