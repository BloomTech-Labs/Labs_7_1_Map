import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider';
import geojson from '../Map/countries.geo.json';

import './BorderBay.css';
import 'rc-slider/assets/index.css';

const marks = {
  0: 'No Interest',
  1: {
    style: {
      color: 'pink'
    },
    label: 'Wishlist'
  },
  2: {
    style: {
      color: 'yellow'
    },
    label: 'Transited'
  },
  3: {
    style: {
      color: 'green'
    },
    label: 'Visited'
  },
  4: {
    style: {
      color: 'blue'
    },
    label: 'Lived'
  }
};

function log(value) {
  console.log(value); //eslint-disable-line
}

export default class BorderBay extends Component {
  state = {
    border: geojson.features
  };

  getBorderById(border) {
    this.setState({ border: border.id.geometry });
  }

  render() {
    return (
      <div className="Country_Border">
        <p className="Country_Border-Border">{''}</p>
        <div className="Country_Border-Slider">
          <p className="Slider-Tag">Level of Stay</p>
          <Slider
            min={0}
            max={4}
            marks={marks}
            step={null}
            onChange={log}
            defaultValue={0}
            // value={0}
          />
        </div>
      </div>
    );
  }
}
