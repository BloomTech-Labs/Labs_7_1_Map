// Styles for the highlight of a clicked on country
const styleSelected = {
  stroke: true,
  color: 'gold',
  opacity: 1,
  fill: true,
  fillColor: 'gold',
  fillOpacity: 0
};

// Styles for the highlight of a hovered over country
const styleHover = {
  stroke: false,
  fill: true,
  fillColor: 'gold',
  fillOpacity: 0.3
};

// Styles for country based on status_code
const styleOther = {
  // status_code: 0
  stroke: true,
  color: 'gray',
  opacity: 0.2,
  fill: true,
  fillColor: 'gray',
  fillOpacity: 0.3
};

const styleWishlist = {
  // status_code: 1
  stroke: true,
  color: 'purple',
  opacity: 0.2,
  fill: true,
  fillColor: 'purple',
  fillOpacity: 0.3
};

const styleTransited = {
  // status_code: 1
  stroke: true,
  color: 'yellow',
  opacity: 0.2,
  fill: true,
  fillColor: 'yellow',
  fillOpacity: 0.3
};

const styleVisited = {
  // status_code: 3
  stroke: true,
  color: 'red',
  opacity: 0.2,
  fill: true,
  fillColor: 'red',
  fillOpacity: 0.3
};

const styleLivedIn = {
  // status_code: 4
  stroke: true,
  color: 'blue',
  opacity: 0.2,
  fill: true,
  fillColor: 'blue',
  fillOpacity: 0.3
};

const styleHome = {
  // status_code: 5
  stroke: true,
  color: 'green',
  opacity: 0.2,
  fill: true,
  fillColor: 'green',
  fillOpacity: 0.3
};

// Export country status styles as an object so they can be
// easily used in Map components render function
const countryStatusStyles = {
  0: styleOther,
  1: styleWishlist,
  2: styleTransited,
  3: styleVisited,
  4: styleLivedIn,
  5: styleHome
};

module.exports = {
  styleSelected,
  styleHover,
  countryStatusStyles
};
