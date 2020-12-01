import {getRandomInteger} from '../util.js';

const filmToFilterMap = {
  all: (films) => films.length,
  isWatchList: (films) => films.filter((film) => film.filters.isWatchList).length,
  isHistory: (films) => films.filter((film) => film.filters.isHistory).length,
  isFavorites: (films) => films.filter((film) => film.filters.isFavorites).length,
};

export const generateFilters = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilm]) => {
    return {
      name: filterName,
      count: countFilm(films),
    };
  });
}
