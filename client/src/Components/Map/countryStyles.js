const colorPalette = {
  0: 'gray',
  1: '#6C596E', // Wishlist
  2: '#43915F', // Transited
  3: '#A62639', // Visited
  4: '#427AA1' // Lived
};

const labels = {
  0: 'None',
  1: 'Wishlist',
  2: 'Transited',
  3: 'Visited',
  4: 'Lived'
};

// Styles for the highlight of a clicked on country
const styleSelected = {
  stroke: true,
  color: 'orange',
  opacity: 1,
  fill: true,
  fillColor: 'orange',
  fillOpacity: 0
};

// Styles for the highlight of a hovered over country
const styleHover = {
  stroke: false,
  fill: true,
  fillColor: 'orange',
  fillOpacity: 0.5
};

// Styles for country based on status_code
const styleOther = {
  // status_code: 0
  stroke: false,
  fill: true,
  fillColor: 'gray',
  fillOpacity: 0
};

const styleWishlist = {
  // status_code: 1
  stroke: false,
  fill: true,
  fillColor: colorPalette[1],
  fillOpacity: 1
};

const styleTransited = {
  // status_code: 1
  stroke: false,
  fill: true,
  fillColor: colorPalette[2],
  fillOpacity: 1
};

const styleVisited = {
  // status_code: 3
  stroke: false,
  fill: true,
  fillColor: colorPalette[3],
  fillOpacity: 1
};

const styleLivedIn = {
  // status_code: 4
  stroke: false,
  fill: true,
  fillColor: colorPalette[4],
  fillOpacity: 1
};

// Export country status styles as an object so they can be
// easily used in Map components render function
const countryStatusStyles = {
  0: styleOther,
  1: styleWishlist,
  2: styleTransited,
  3: styleVisited,
  4: styleLivedIn
};

module.exports = {
  colorPalette,
  labels,
  styleSelected,
  styleHover,
  countryStatusStyles
};
