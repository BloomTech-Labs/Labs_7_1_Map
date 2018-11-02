import L from 'leaflet';

/* LEAFLET MAP SETUP START */
// Marker (workaround for an issue with react-leaflet)
//TODO: Change to custom icon
export const markerIcon = L.icon({
  iconUrl:
    'https://visualpharm.com/assets/658/Map%20Pin-595b40b75ba036ed117d9f4f.svg',
  shadowUrl: null,
  iconSize: [35, 30],
  iconAnchor: [0, 0]
});

// Url's for different map tiles (active tile is set in component state)
export const mapTilesUrls = {
  standard: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  toner: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
  terrain: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png',
  watercolor: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
  light:
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  dark:
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
};

// Map bounds; set to maximum longitude and latitude
const corner1 = L.latLng(90, -180);
const corner2 = L.latLng(-90, 180);
export const bounds = L.latLngBounds(corner1, corner2);
/* LEAFLET MAP SETUP END */
