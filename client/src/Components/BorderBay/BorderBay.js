import 'rc-slider/assets/index.css';

import React, { Component } from 'react';
import Slider from 'rc-slider';
import './BorderBay.css';

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

class BorderBay extends Component {
  state = {
    value: [0, 25, 50, 75, 100]
  };

  sliderHandler(e) {
    this.setState = { value: e.target.value };
  }

  render() {
    return (
      <div className="Country_Border">
        <p className="Country_Border-Border">Border</p>
        <div className="Country_Border-Slider">
          <Slider
            min={0}
            max={4}
            marks={marks}
            step={null}
            onChange={log}
            defaultValue={0}
            value={0}
          />
        </div>
      </div>
    );
  }
}

export default BorderBay;
