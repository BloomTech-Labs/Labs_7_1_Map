// Styles for the highlight of a clicked on country
const styleSelected = {
  stroke: true,
  color: 'gold',
  opacity: 1,
  fill: true,
  fillColor: 'gold',
  fillOpacity: 0
};

const styleOther = {
  stroke: true,
  color: 'gray',
  opacity: 0.2,
  fill: true,
  fillColor: 'gray',
  fillOpacity: 0.3
};

const styleWishlist = {
  stroke: true,
  color: 'purple',
  opacity: 0.2,
  fill: true,
  fillColor: 'purple',
  fillOpacity: 0.3
};

const styleVisited = {
  stroke: true,
  color: 'red',
  opacity: 0.2,
  fill: true,
  fillColor: 'red',
  fillOpacity: 0.3
};

const styleLivedIn = {
  stroke: true,
  color: 'blue',
  opacity: 0.2,
  fill: true,
  fillColor: 'blue',
  fillOpacity: 0.3
};

const styleHome = {
  stroke: true,
  color: 'green',
  opacity: 0.2,
  fill: true,
  fillColor: 'green',
  fillOpacity: 0.3
};

const countryStatusStyles = {
  0: styleOther,
  1: styleWishlist,
  2: styleVisited,
  3: styleLivedIn,
  4: styleHome
};

// Styles for the highlight of a hovered over country
const styleHover = {
  stroke: false,
  fill: true,
  fillColor: 'gold',
  fillOpacity: 0.3
};

module.exports = {
  styleSelected,
  styleHover,
  countryStatusStyles
};
