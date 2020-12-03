import {getRandomInteger} from '../util.js';

const getAuthorComment = () => {
  const authors = [
    `Tim Macoveev`,
    `John Doe`,
    `Rick Flag`,
    `Peter Parker`,
    `Bruce Banner`,
    `Louise Laine`,
    `Mails Morales`,
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return `${authors[randomIndex]}`;
};

const getTextComment = () => {
  const text = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
    `Are you crazy?`,
    `Oh my god. It is beautiful!`,
  ];

  const randomIndex = getRandomInteger(0, text.length - 1);

  return `${text[randomIndex]}`;
};

const getEmojiComment = () => {
  const path = `./images/emoji/`;

  const emojies = [
    `angry.png`,
    `puke.png`,
    `sleeping.png`,
    `smile.png`,
  ];

  const randomIndex = getRandomInteger(0, emojies.length - 1);

  return `${path}${emojies[randomIndex]}`;
};

const getDateComment = () => {
  const year = getRandomInteger(2015, 2020);
  const month = getRandomInteger(1, 12);
  const day = getRandomInteger(1, 31);
  const hours = getRandomInteger(0, 23);
  const minutes = getRandomInteger(0, 59);

  const editedHours = hours === 0 ? `00` : hours;
  const editedMinutes = minutes === 0 ? `00` : minutes;

  return `${year}/${month}/${day} ${editedHours}:${editedMinutes}`;
};

const generateComment = () => {
  return {
    author: getAuthorComment(),
    text: getTextComment(),
    emoji: getEmojiComment(),
    date: getDateComment(),
  };
};

export const generateComments = () => {
  const COUNT_OF_COMMENT = getRandomInteger(1, 5);
  const comments = [];
  for (let i = 0; i < COUNT_OF_COMMENT; i += 1) {
    const currentComment = generateComment();
    comments.push(currentComment);
  }
  return comments;
};
