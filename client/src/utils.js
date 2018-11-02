import geojson from './Components/Map/countries.geo.json';
import world from 'country-data';

// Helper function that takes in a country code and returns a geoJSON object
export function getCountryShapeFromCode(countryCode) {
  return geojson.features.find(feature => feature.id === countryCode);
}

// Helper function to get country code from string i.e. 'canada' -> 'CAN'
export function getCountryCodeFromName(countryName) {
  const countryFeature = geojson.features.find(
    feature =>
      feature.properties.name.toLowerCase() === countryName.toLowerCase()
  );
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

export function clearLocalstorage() {
  // delete the tokens from the browser
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export const polygonBoundingBox = coordinates => {
  const bounds = {
    xMin: coordinates[0][0],
    xMax: coordinates[0][0],
    yMin: coordinates[0][1],
    yMax: coordinates[0][1]
  };

  coordinates.forEach(point => {
    if (point[0] < bounds.xMin) bounds.xMin = point[0];
    if (point[0] > bounds.xMax) bounds.xMax = point[0];
    if (point[1] < bounds.yMin) bounds.yMin = point[1];
    if (point[1] > bounds.yMax) bounds.yMax = point[1];
  });

  return bounds;
};

export const multiPolygonBoundingBox = shape => {
  const bounds = {
    xMin: shape[0][0][0][0],
    xMax: shape[0][0][0][0],
    yMin: shape[0][0][0][1],
    yMax: shape[0][0][0][1]
  };

  shape.forEach(coordinates => {
    coordinates[0].forEach(point => {
      if (point[0] < bounds.xMin) bounds.xMin = point[0];
      if (point[0] > bounds.xMax) bounds.xMax = point[0];
      if (point[1] < bounds.yMin) bounds.yMin = point[1];
      if (point[1] > bounds.yMax) bounds.yMax = point[1];
    });
  });
  return bounds;
};

export const getBoundingBox = geometry => {
  switch (geometry.type) {
    case 'Polygon':
      return polygonBoundingBox(geometry.coordinates[0]);
    case 'MultiPolygon':
      return multiPolygonBoundingBox(geometry.coordinates);
    default:
      console.log('NONE');
  }
};
