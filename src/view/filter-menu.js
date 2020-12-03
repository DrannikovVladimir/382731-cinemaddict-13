import {createElement} from '../util.js';

const createSiteFilterTemplate = (filter, isChecked) => {
  return isChecked
    ? `<a href="#${filter.name}" class="main-navigation__item main-navigation__item--active">${filter.name}</a>`
    : `<a href="#${filter.name}" class="main-navigation__item">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`;
};

const createFilterTemplate = (filters) => {
  const filterResult = filters.map((filter, index) => {
    const result = createSiteFilterTemplate(filter, index === 0);
    return result;
  }).join(`\n`);

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterResult}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class SiteFilter {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
