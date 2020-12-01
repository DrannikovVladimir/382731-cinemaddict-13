const createFilterTemplate = (filter, isChecked) => {
  return isChecked
    ? `<a href="#${filter.name}" class="main-navigation__item main-navigation__item--active">${filter.name}</a>`
    : `<a href="#${filter.name}" class="main-navigation__item">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`;
};

export const createSiteFilterTemplate = (filters) => {
  const filterResult = filters.map((filter, index) => {
    const {name, count} = filter;
    const result = createFilterTemplate(filter, index === 0);
    return result;
  }).join('\n');

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterResult}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};
