import {createElement} from '../util.js';

const createFilmsEmptyTemplate = () => {
  return `<section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>`;
};

export default class FilmsEmpty {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsEmptyTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
