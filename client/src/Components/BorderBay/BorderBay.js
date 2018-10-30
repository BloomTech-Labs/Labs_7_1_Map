import React from 'react';
// import geojson2svg from 'geojson-to-svg';
// import geojson from '../Map/countries.geo.json';
import { getCountryBorderFromCoord } from '../../utils.js';
import Slider from 'rc-slider/lib/Slider';

import './BorderBay.css';
import 'rc-slider/assets/index.css';

const marks = {
  0: 'No Interest',
  1: { style: { color: 'pink' }, label: 'Wishlist' },
  2: { style: { color: 'yellow' }, label: 'Transited' },
  3: { style: { color: 'green' }, label: 'Visited' },
  4: { style: { color: 'blue' }, label: 'Lived' }
};

// geojson2svg()
//   .projection(function(coord) {
//     return [coord[0] + 1, coord[1] + 1];
//   })
//   .data({
//     type: 'Feature',
//     geometry: {
//       type: 'Polygon || MultiPolygon',
//       coordinates: []
//     }
//   })
//   .render();

const log = value => {
  console.log(value); //eslint-disable-line
};

const BorderBay = () => {
  return (
    <div className="Country_Border">
      <canvas className="Country_Border-Border">
        {getCountryBorderFromCoord}
      </canvas>
      <div className="Country_Border-Slider">
        <p className="Slide-Tag">Level of Stay</p>
        <Slider
          className="Slider1"
          min={0}
          max={4}
          marks={marks}
          step={null}
          onChange={log}
          defaultValue={0}
        />
      </div>
    </div>
  );
};

export default BorderBay;
