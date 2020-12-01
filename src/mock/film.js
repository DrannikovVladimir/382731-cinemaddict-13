import {getRandomInteger} from '../util.js';
import {generateComments} from './comment.js';

export const filmsList = [
  `Back to the future`,
  `Terminator 2: Judgment day`,
  `Batman`,
  `Iron man`,
  `Doctor Strange`,
  `Aquaman`,
  `Thor`,
  `The Captain of America`,
  `The black Panther`,
  `Back to the future. Part 2`,
  `The Godfather`,
  `Breaking Bad`,
  `House of Cards`,
  `Lock, Stock and Two Smoking Barrels`,
  `Lord of the Rings: The Fellowship of the Ring`,
  `Dark Knight`,
  `True Detective`,
  `The Matrix`,
  `Pulp Fiction`,
  `Inception`,
  `Lion King`,
  `Fight Club`,
  `American Beauty`,
  `Requiem for a Dream`,
  `Whiplash`,
  `Forrest Gump`,
  `Casino Royale`,
  `How I Met Your Mother`,
  `Prison Break`,
];

const getPosterFilm = () => {
  const path = `./images/posters/`;
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return `${path}${posters[randomIndex]}`;
};

const getRatingFilm = () => {
  const integerNumber = getRandomInteger(3, 9);
  const fractionalNumber = getRandomInteger(0, 9);

  return `${integerNumber}.${fractionalNumber}`;
};

const getProdactionYear = () => {
  return getRandomInteger(1925, 2020);
};

const getDurationFilm = () => {
  const minutes = getRandomInteger(83, 185);
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  return `${hours}h ${restMinutes}m`;
}

const getGenreFilm = () => {
  const genres = [
    `Action`,
    `Comedy`,
    `Drama`,
    `Fantasy`,
    `Horror`,
    `Mystery`,
    `Romance`,
    `Thriller`,
  ];

  return genres.filter((genre) => {
    if (getRandomInteger(1, 3) % 2 === 0) {
      return genre;
    }
  });
};

export const getDescriptionFilm = () => {
  const text = {
    1: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    2: `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    3: `Fusce tristique felis at fermentum pharetra.`,
    4: `Aliquam id orci ut lectus varius viverra.`,
    5: `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    6: `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    7: `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    8: `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    9: `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  };

  const getCountOfText = getRandomInteger(1, 5);
  let result = '';

  for (let i = 0; i < getCountOfText; i += 1) {
    result += `${text[getRandomInteger(1, 9)]} `;
  }

  return result.slice(0, -1);
};

const getFilmProducer = () => {
  const producers = [
    `Kevin Feige`,
    `Kathleen Kennedy`,
    `Jerry Bruckheimer`,
    `Neal H. Moritz`,
    `Frank Marshall`,
    `Charles Roven`,
    `Lorenzo di Bonaventura`,
    `Ian Bryce`,
    `Lauren Shuler Donner`,
    `J. J. Abrams`,
  ];

  const randomIndex = getRandomInteger(0, producers.length - 1);

  return `${producers[randomIndex]}`;
};

const getFilmWriters = () => {
  const writers = [
    `Quentin Tarantino`,
    `Christopher Nolan`,
    `Joel Coen`,
    `Michael Mann`,
    `Frank Darabont`,
    `Sergio Leone`,
    `Wes Anderson`,
    `Martin Scorsese`,
    `Damien Chazelle`,
    `Drew Goddard`,
  ];

  return writers.filter((writer) => {
    if (getRandomInteger(1, 3) % 2 === 0) {
      return writer;
    }
  });
};

const getFilmActors = () => {
  const actors = [
    `Jack Nicholson`,
    `Marlon Brando`,
    `Robert De Niro`,
    `Al Pacino`,
    `Daniel Day-Lewis`,
    `Dustin Hoffman`,
    `Tom Hanks`,
    `Anthony Hopkins`,
    `Paul Newman`,
    `Denzel Washington`,
    `Michael Caine`,
    `James Stewart`,
    `Robin Williams`,
    `Morgan Freeman`,
  ];

  return actors.filter((actor) => {
    if (getRandomInteger(1, 3) % 2 === 0) {
      return actor;
    }
  });
};

const getReleaseDate = () => {
  const months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `Oktober`,
    `November`,
    `December`,
  ];

  const randomIndex = getRandomInteger(0, months.length - 1);
  const day = getRandomInteger(1, 31);

  return `${day} ${months[randomIndex]}`;
};

const getFilmCountry = () => {
  const countries = [
    `Usa`,
    `Brasil`,
    `Russia`,
    `Kazakhstan`,
    `German`,
    `Canada`,
    `Australia`,
    `Italy`,
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const isWatchList = () => {
  return getRandomInteger(2, 3) % 2 === 0;
};

const isHistory = () => {
  return getRandomInteger(2, 3) % 2 === 0;
};

const isFavorites = () => {
  return getRandomInteger(2, 3) % 2 === 0;
};

export const generateFilm = (name) => {
  const genres = getGenreFilm();

  return {
    poster: getPosterFilm(),
    name,
    rating: getRatingFilm(),
    year: getProdactionYear(),
    duration: getDurationFilm(),
    genres,
    description: getDescriptionFilm(),
    comments: generateComments(),
    country: getFilmCountry(),
    releaseDate: getReleaseDate(),
    actors: getFilmActors(),
    writers: getFilmWriters(),
    director: getFilmProducer(),
    filters: {
      isWatchList: isWatchList(),
      isHistory: isHistory(),
      isFavorites: isFavorites(),
    },
  };
};
