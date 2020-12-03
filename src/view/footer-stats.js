import {createElement} from '../util.js';

const createFooterStats = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class FooterStats {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStats();
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
