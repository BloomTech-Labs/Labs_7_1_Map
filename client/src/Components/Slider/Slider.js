import React, { Component } from 'react';
import Slider from 'rc-slider';

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

class Slide extends Component {
  render() {
    return (
      <div className="Slide">
        <p className="Slide-Tag">Level of Stay</p>
        <div className="Slide-Slider">
          <Slider
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
  }
}

export default Slide;
