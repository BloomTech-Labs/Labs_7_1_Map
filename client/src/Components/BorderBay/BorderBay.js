import React from 'react';
import Slider from 'rc-slider/lib/Slider';

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

const BorderBay = props => {
    return (
      <div className="Country_Border">
        <div className="Country_Border-Border">{props.getCountryShape}</div>
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

export default BorderBay;
