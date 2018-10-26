import geojson from './Components/Map/countries.geo.json';
import world from 'country-data';

// Helper function that takes in a country code and returns a geoJSON object
export function getCountryShape(countryCode) {
  return geojson.features.find(feature => feature.id === countryCode);
}

// Helper function to get country code from string i.e. 'canada' -> 'CAN'
export function getCountryCode(countryString) {
  const countryFeature = geojson.features.find(
    feature =>
      feature.properties.name.toLowerCase() === countryString.toLowerCase()
  );
  if (!countryFeature) console.log('There is no country by that name');
  return countryFeature ? countryFeature.id : null;
}

export function getCountryInfoFromCode(countryCode) {
  return (
    world.countries[countryCode] || {
      name: 'No country found!',
      emoji: ''
    }
  );
}
