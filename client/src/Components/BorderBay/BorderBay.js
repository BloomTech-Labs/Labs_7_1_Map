import 'rc-slider/assets/index.css';

import React, { Component } from 'react';
import Slider from 'rc-slider';
import './BorderBay.css';

const marks = {
  0: 'No Interest',
  25: {
    style: {
      color: 'pink'
    },
    label: 'Wishlist'
  },
  50: {
    style: {
      color: 'yellow'
    },
    label: 'Transited'
  },
  75: {
    style: {
      color: 'green'
    },
    label: 'Visited'
  },
  100: {
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

  render() {
    return (
      <div className="Country_Border">
        <p className="Country_Border-Border">Border</p>
        <div className="Country_Border-Slider">
          <Slider
            min={0}
            marks={marks}
            step={null}
            onChange={log}
            defaultValue={0}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}

export default BorderBay;
